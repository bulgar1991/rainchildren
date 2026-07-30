import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BlogComponent } from '../../components/blog/blog.component';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';

interface Milestone {
  year: string;
  titleKey: string;
  descKey: string;
}

interface TeamMember {
  image: string;
  nameKey: string;
  roleKey: string;
  fb?: string;
  ig?: string;
}

interface Value {
  icon: string;
  titleKey: string;
  descKey: string;
  color: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, BlogComponent, VolunteerBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly stats = [
    { value: '1 200+', labelKey: 'about.stats.childrenLabel' },
    { value: '150+',   labelKey: 'about.stats.volunteersLabel' },
    { value: '8',      labelKey: 'about.stats.yearsLabel' },
    { value: '300+',   labelKey: 'about.stats.eventsLabel' },
  ];

  readonly values: Value[] = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      titleKey: 'about.values.v1.title', descKey: 'about.values.v1.desc', color: '#f43f5e',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
      titleKey: 'about.values.v2.title', descKey: 'about.values.v2.desc', color: '#ffb547',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      titleKey: 'about.values.v3.title', descKey: 'about.values.v3.desc', color: '#5b8af0',
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      titleKey: 'about.values.v4.title', descKey: 'about.values.v4.desc', color: '#34d399',
    },
  ];

  readonly milestones: Milestone[] = [
    { year: '2016', titleKey: 'about.story.m1.title', descKey: 'about.story.m1.desc' },
    { year: '2018', titleKey: 'about.story.m2.title', descKey: 'about.story.m2.desc' },
    { year: '2020', titleKey: 'about.story.m3.title', descKey: 'about.story.m3.desc' },
    { year: '2023', titleKey: 'about.story.m4.title', descKey: 'about.story.m4.desc' },
  ];

  readonly team: TeamMember[] = [
    { image: 'assets/images/team-1.jpg', nameKey: 'about.team.m1.name', roleKey: 'about.team.m1.role', fb: '#', ig: '#' },
    { image: 'assets/images/team-2.jpg', nameKey: 'about.team.m2.name', roleKey: 'about.team.m2.role', fb: '#', ig: '#' },
    { image: 'assets/images/team-3.jpg', nameKey: 'about.team.m3.name', roleKey: 'about.team.m3.role', fb: '#', ig: '#' },
    { image: 'assets/images/team-4.jpg', nameKey: 'about.team.m4.name', roleKey: 'about.team.m4.role', fb: '#', ig: '#' },
  ];

  readonly partners = [
    'UNICEF Moldova', 'Soros Foundation', 'Orange Moldova',
    'Kaufland Romania', 'BCR Banca', 'Pro TV',
  ];
}
