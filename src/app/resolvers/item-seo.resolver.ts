import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '@services/seo.service';

// Loads the item for /<section>/:id and sets its SEO tags. itemExistsGuard has already checked
// that the id exists. `seo` is the item's SEO translation key prefix ('.title', '.description').
export const itemSeoResolver =
  <T extends { seo: string; shareImage: string }>(
    find: (id: string | null) => T | undefined,
  ): ResolveFn<T> =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T => {
    const item = find(route.paramMap.get('id'))!;
    inject(SeoService).apply(
      {
        title: item.seo + '.title',
        description: item.seo + '.description',
        type: 'article',
        image: item.shareImage,
      },
      state.url,
    );
    return item;
  };
