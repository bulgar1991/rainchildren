import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';

// Loads the item for /<section>/:id and sets its SEO tags. itemExistsGuard has already checked
// that the id exists. `key` is the item's translation key prefix ('.title' + `descriptionSuffix`).
export const itemSeoResolver =
  <T extends { key: string; image: string }>(
    find: (id: string | null) => T | undefined,
    descriptionSuffix: string,
  ): ResolveFn<T> =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T => {
    const item = find(route.paramMap.get('id'))!;
    inject(SeoService).apply(
      {
        title: 'seo.detail.title',
        description: item.key + descriptionSuffix,
        params: { name: item.key + '.title' },
        type: 'article',
        image: item.image,
      },
      state.url,
    );
    return item;
  };
