import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

interface BannerSlide {
  image: string;
  titleKey: string;
  descKey: string;
  primaryKey: string;
  primaryLink: string;
  secondaryKey: string;
  secondaryLink: string;
}

@Component({
  selector: 'app-banner-slider',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>;

  private swiper!: InstanceType<typeof Swiper>;

  readonly slides: BannerSlide[] = [
    {
      image: 'assets/images/banner/banner-1.webp',
      titleKey: 'banner.slide1.title',
      descKey: 'banner.slide1.desc',
      primaryKey: 'banner.slide1.primary',
      primaryLink: '/about',
      secondaryKey: 'banner.slide1.secondary',
      secondaryLink: '/donate',
    },
    {
      image: 'assets/images/banner/banner-2.webp',
      titleKey: 'banner.slide2.title',
      descKey: 'banner.slide2.desc',
      primaryKey: 'banner.slide2.primary',
      primaryLink: '/programs',
      secondaryKey: 'banner.slide2.secondary',
      secondaryLink: '/contact',
    },
    {
      image: 'assets/images/banner/banner-3.webp',
      titleKey: 'banner.slide3.title',
      descKey: 'banner.slide3.desc',
      primaryKey: 'banner.slide3.primary',
      primaryLink: '/gallery',
      secondaryKey: 'banner.slide3.secondary',
      secondaryLink: '/contact',
    },
    {
      image: 'assets/images/banner/banner-4.webp',
      titleKey: 'banner.slide4.title',
      descKey: 'banner.slide4.desc',
      primaryKey: 'banner.slide4.primary',
      primaryLink: '/programs/baschet',
      secondaryKey: 'banner.slide4.secondary',
      secondaryLink: '/gallery',
    },
    {
      image: 'assets/images/banner/banner-5.webp',
      titleKey: 'banner.slide5.title',
      descKey: 'banner.slide5.desc',
      primaryKey: 'banner.slide5.primary',
      primaryLink: '/programs',
      secondaryKey: 'banner.slide5.secondary',
      secondaryLink: '/contact',
    },
  ];

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperEl.nativeElement, {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.banner-slider__pagination', clickable: true },
      navigation: {
        prevEl: '.banner-slider__arrow--prev',
        nextEl: '.banner-slider__arrow--next',
      },
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy();
  }
}
