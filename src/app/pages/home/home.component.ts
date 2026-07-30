import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerSliderComponent } from '../../components/banner-slider/banner-slider.component';
import { BlogComponent } from '../../components/blog/blog.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';
import { ProgramsSliderComponent } from '../../components/programs-slider/programs-slider.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-home',
  imports: [
    BannerSliderComponent,
    BlogComponent,
    PromoBannerComponent,
    GalleryComponent,
    VolunteerBannerComponent,
    ProgramsSliderComponent,
    FaqComponent,
  ],
  template: `
    <app-banner-slider />
    <app-blog />
    <app-promo-banner />
    <app-gallery [limit]="9" />
    <app-volunteer-banner />
    <app-programs-slider />
    <app-faq />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
