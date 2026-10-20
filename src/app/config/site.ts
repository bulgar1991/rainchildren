// Year Rain Children was founded; "years of activity" on the site is counted from it.
export const FOUNDED_YEAR = 2020;

export function yearsActive(today = new Date()): number {
  return today.getFullYear() - FOUNDED_YEAR;
}

// Public address of the website, without a trailing slash. Used for canonical links and
// Open Graph URLs. Also update it in src/index.html, src/robots.txt and src/sitemap.xml.
export const SITE_URL = 'https://rainchildren.md';

export const SITE_NAME = 'Rain Children';

// Default image when a page is shared on social media (1200×630). A route can set its own
// with `data.seo.image`.
export const SITE_SHARE_IMAGE = {
  path: 'assets/images/seo/og-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  // Translation key for the image's alt text.
  alt: 'seo.imageAlt',
};

// Open Graph locale per site language (locales Facebook supports).
export const OG_LOCALES: Record<string, string> = {
  ro: 'ro_RO',
  en: 'en_GB',
  ru: 'ru_RU',
};

// Rain Children's social media pages (footer + structured data in src/index.html).
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/rain.children.7',
  instagram: 'https://www.instagram.com/rain._children/',
};
