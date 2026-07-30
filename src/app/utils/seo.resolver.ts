import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SeoService } from '../services/seo.service';

export const seoResolver: ResolveFn<void> = route => {
  const seo = route.data?.['seo'];
  if (seo) {
    inject(SeoService).update(seo);
  }
};
