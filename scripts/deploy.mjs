// Uploads the production build to the cPanel host over FTPS and removes the files of older builds.
// Run with `npm run deploy` (builds first). Credentials come from .env (not committed), see
// .env.example.
//
// Order keeps the live site working during the upload: every new file goes up first, index.html
// last (it is what points the browser at the new hashed chunks), and only then are the files that
// are not in the new build deleted.
import { Client } from 'basic-ftp';
import { readdir, stat } from 'node:fs/promises';
import { join, posix } from 'node:path';

const LOCAL_DIR = 'dist/rainchildren/browser';
// Never deleted from the server: cPanel / Let's Encrypt files that are not part of the build.
const KEEP = new Set(['.well-known', 'cgi-bin', '.ftpquota', 'error_log']);
const SKIP_LOCAL = new Set(['.gitkeep', '.DS_Store']);
const RETRIES = 3;

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_DIR = '/public_html' } = process.env;
if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error('Set FTP_HOST, FTP_USER and FTP_PASSWORD in .env (see .env.example).');
  process.exit(1);
}

// Relative paths ('assets/i18n/en.json') of every file and folder in the build.
async function listLocal(dir = '', files = new Map(), dirs = new Set()) {
  for (const entry of await readdir(join(LOCAL_DIR, dir), { withFileTypes: true })) {
    if (SKIP_LOCAL.has(entry.name)) continue;
    const path = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      dirs.add(path);
      await listLocal(path, files, dirs);
    } else {
      files.set(path, (await stat(join(LOCAL_DIR, path))).size);
    }
  }
  return { files, dirs };
}

async function connect() {
  const client = new Client(60_000);
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: true,
    // The shared host's certificate is issued for the server name, not ftp.rainchildren.md.
    secureOptions: { rejectUnauthorized: false },
  });
  return client;
}

// Uploads one file and checks the size the server reports; a fresh connection on each retry,
// since a failed FTPS data transfer (451) can leave the control connection unusable.
async function upload(state, path, size) {
  const remote = posix.join(FTP_DIR, path);
  for (let attempt = 1; ; attempt++) {
    try {
      await state.client.ensureDir(posix.dirname(remote));
      await state.client.uploadFrom(join(LOCAL_DIR, path), remote);
      const remoteSize = await state.client.size(remote);
      if (remoteSize !== size) throw new Error(`size ${remoteSize}, expected ${size}`);
      return;
    } catch (error) {
      if (attempt >= RETRIES) throw new Error(`${path}: ${error.message}`);
      console.warn(`  retry ${path} (${error.message})`);
      state.client.close();
      state.client = await connect();
    }
  }
}

// Deletes everything under `dir` on the server that is not in the new build.
async function prune(client, local, dir = '') {
  for (const entry of await client.list(posix.join(FTP_DIR, dir))) {
    if (entry.name === '.' || entry.name === '..') continue;
    const path = dir ? `${dir}/${entry.name}` : entry.name;
    if (!dir && KEEP.has(entry.name)) continue;
    const remote = posix.join(FTP_DIR, path);
    if (entry.isDirectory) {
      if (local.dirs.has(path)) await prune(client, local, path);
      else {
        console.log(`  delete ${path}/`);
        await client.removeDir(remote);
      }
    } else if (!local.files.has(path)) {
      console.log(`  delete ${path}`);
      await client.remove(remote);
    }
  }
}

const local = await listLocal();
if (!local.files.has('index.html')) {
  console.error(`No ${LOCAL_DIR}/index.html - run the build first.`);
  process.exit(1);
}

const state = { client: await connect() };
try {
  const files = [...local.files].filter(([path]) => path !== 'index.html');
  console.log(`Uploading ${files.length + 1} files to ${FTP_HOST}${FTP_DIR}`);
  for (const [i, [path, size]] of files.entries()) {
    console.log(`  [${i + 1}/${files.length}] ${path}`);
    await upload(state, path, size);
  }
  await upload(state, 'index.html', local.files.get('index.html'));
  console.log('  index.html');

  console.log('Removing files of older builds');
  await prune(state.client, local);
  console.log('Deployed.');
} catch (error) {
  console.error(`Deploy failed: ${error.message}`);
  console.error('index.html is only replaced after every other file is up, so the old build');
  console.error('keeps working unless the failure was in index.html itself. Run deploy again.');
  process.exitCode = 1;
} finally {
  state.client.close();
}
