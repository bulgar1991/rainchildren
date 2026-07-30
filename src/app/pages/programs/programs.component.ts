import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';

interface Program {
  icon: string;
  color: string;
  titleKey: string;
  descKey: string;
  activities: string[];
  image: string;
}

@Component({
  selector: 'app-programs',
  imports: [RouterLink, TranslatePipe, VolunteerBannerComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramsComponent {
  readonly programs: Program[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
      color: '#5b8af0', image: 'assets/images/prog-art.jpg',
      titleKey: 'programs.art.title', descKey: 'programs.art.desc',
      activities: ['programs.art.a1', 'programs.art.a2', 'programs.art.a3'],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
      color: '#a78bfa', image: 'assets/images/prog-music.jpg',
      titleKey: 'programs.music.title', descKey: 'programs.music.desc',
      activities: ['programs.music.a1', 'programs.music.a2', 'programs.music.a3'],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      color: '#34d399', image: 'assets/images/prog-education.jpg',
      titleKey: 'programs.education.title', descKey: 'programs.education.desc',
      activities: ['programs.education.a1', 'programs.education.a2', 'programs.education.a3'],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      color: '#fb923c', image: 'assets/images/prog-social.jpg',
      titleKey: 'programs.social.title', descKey: 'programs.social.desc',
      activities: ['programs.social.a1', 'programs.social.a2', 'programs.social.a3'],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
      color: '#f43f5e', image: 'assets/images/prog-sport.jpg',
      titleKey: 'programs.sport.title', descKey: 'programs.sport.desc',
      activities: ['programs.sport.a1', 'programs.sport.a2', 'programs.sport.a3'],
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      color: '#ffb547', image: 'assets/images/prog-family.jpg',
      titleKey: 'programs.family.title', descKey: 'programs.family.desc',
      activities: ['programs.family.a1', 'programs.family.a2', 'programs.family.a3'],
    },
  ];
}
