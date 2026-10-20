import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FOUNDED_YEAR, yearsActive } from '@/config/site';
import { VolunteerBannerComponent } from '../../components/volunteer-banner/volunteer-banner.component';

interface Milestone {
  // A year, or a translation key such as 'about.story.today'.
  year: string;
  titleKey: string;
  descKey: string;
}

interface TeamMember {
  // Shown as initials until a photo is added.
  image?: string;
  initials: string;
  nameKey: string;
  roleKey: string;
  fb?: string;
  ig?: string;
}

interface Value {
  // Icon-font class (assets/icons/font-icons, Font Awesome Free 7.3.1 solid icons).
  icon: string;
  titleKey: string;
  descKey: string;
  color: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe, VolunteerBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly yearsActive = yearsActive();

  readonly values: Value[] = [
    {
      icon: 'icon-heart-solid-full',
      titleKey: 'about.values.v1.title',
      descKey: 'about.values.v1.desc',
      color: '#f43f5e',
    },
    {
      icon: 'icon-face-smile-solid-full',
      titleKey: 'about.values.v2.title',
      descKey: 'about.values.v2.desc',
      color: '#ffb547',
    },
    {
      icon: 'icon-children-solid-full',
      titleKey: 'about.values.v3.title',
      descKey: 'about.values.v3.desc',
      color: '#5b8af0',
    },
    {
      icon: 'icon-medal-solid-full',
      titleKey: 'about.values.v4.title',
      descKey: 'about.values.v4.desc',
      color: '#34d399',
    },
  ];

  readonly milestones: Milestone[] = [
    {
      year: String(FOUNDED_YEAR),
      titleKey: 'about.story.m1.title',
      descKey: 'about.story.m1.desc',
    },
    { year: 'about.story.today', titleKey: 'about.story.m2.title', descKey: 'about.story.m2.desc' },
  ];

  // Rain Children basketball training, July 2026 (wfolio: IMG_1879, IMG_1942, IMG_2185).
  readonly storyPhotos = [
    'assets/images/about/story-1.jpg',
    'assets/images/about/story-2.jpg',
    'assets/images/about/story-3.jpg',
  ];

  // Photos: Irina - wfolio IMG_2131; Igor - from his Facebook.
  readonly team: TeamMember[] = [
    {
      image: 'assets/images/about/team-irina.jpg',
      initials: 'IH',
      nameKey: 'about.team.m1.name',
      roleKey: 'about.team.m1.role',
      fb: 'https://www.facebook.com/irina.hi.464733',
    },
    {
      image: 'assets/images/about/team-igor.jpg',
      initials: 'IB',
      nameKey: 'about.team.m2.name',
      roleKey: 'about.team.m2.role',
      fb: 'https://www.facebook.com/igor.bulgar',
    },
  ];
}
