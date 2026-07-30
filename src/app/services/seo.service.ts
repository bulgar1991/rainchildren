import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

export interface SeoData {
  title?: string;
  description?: string;
  metaTags?: MetaDefinition[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);

  update(seo: SeoData): void {
    if (seo.title) {
      const translated = this.translate.instant(seo.title);
      this.title.setTitle(translated !== seo.title ? translated : seo.title);
    }

    if (seo.metaTags?.length) {
      for (const tag of seo.metaTags) {
        const translatedContent = tag['content']
          ? this.translate.instant(tag['content'] as string)
          : '';
        const resolved: MetaDefinition = { ...tag, content: translatedContent };
        this.meta.updateTag(resolved);
      }
    }
  }
}
