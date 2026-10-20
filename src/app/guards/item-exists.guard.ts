import { CanMatchFn } from '@angular/router';

// Matches /<section>/:id only for a known item, so unknown ids fall through to the 404 page.
export const itemExistsGuard =
  (find: (id: string | undefined) => unknown): CanMatchFn =>
  (_route, segments) =>
    !!find(segments[1]?.path);
