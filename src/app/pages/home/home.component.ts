import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerSliderComponent } from '../../components/banner-slider/banner-slider.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';
import { ProgramsSectionComponent } from '../../components/programs-section/programs-section.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { SportShowcaseComponent } from '@components/sport-showcase/sport-showcase.component';

@Component({
  selector: 'app-home',
  imports: [
    BannerSliderComponent,
    PromoBannerComponent,
    GalleryComponent,
    VolunteerBannerComponent,
    ProgramsSectionComponent,
    FaqComponent,
    SportShowcaseComponent,
  ],
  template: `
    <app-banner-slider />
    <app-promo-banner />
    <app-gallery [limit]="12" />
    <app-volunteer-banner />
    <app-programs-section />
    <app-sport-showcase />
    <app-faq />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
