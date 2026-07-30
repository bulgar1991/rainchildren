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
import { Navigation } from 'swiper/modules';

interface Program {
  icon: string;
  titleKey: string;
  descKey: string;
  link: string;
  color: string;
}

@Component({
  selector: 'app-programs-slider',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './programs-slider.component.html',
  styleUrl: './programs-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramsSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperEl!: ElementRef<HTMLElement>;

  private swiper!: InstanceType<typeof Swiper>;

  readonly programs: Program[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
      titleKey: 'programs.art.title',
      descKey: 'programs.art.desc',
      link: '/programs',
      color: '#5b8af0',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
      titleKey: 'programs.music.title',
      descKey: 'programs.music.desc',
      link: '/programs',
      color: '#a78bfa',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      titleKey: 'programs.education.title',
      descKey: 'programs.education.desc',
      link: '/programs',
      color: '#34d399',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      titleKey: 'programs.social.title',
      descKey: 'programs.social.desc',
      link: '/programs',
      color: '#fb923c',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
      titleKey: 'programs.sport.title',
      descKey: 'programs.sport.desc',
      link: '/programs',
      color: '#f43f5e',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      titleKey: 'programs.family.title',
      descKey: 'programs.family.desc',
      link: '/programs',
      color: '#ffb547',
    },
  ];

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperEl.nativeElement, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        prevEl: '.programs-slider__arrow--prev',
        nextEl: '.programs-slider__arrow--next',
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy();
  }
}
