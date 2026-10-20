import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PROGRAMS } from '@/config/programs';
import { SOCIAL_LINKS } from '@/config/site';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from '@/config/contact';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly phone = CONTACT_PHONE;
  readonly phoneHref = CONTACT_PHONE_HREF;
  readonly email = CONTACT_EMAIL;
  readonly emailHref = CONTACT_EMAIL_HREF;

  readonly year = new Date().getFullYear();

  readonly navLinks = [
    { key: 'header.nav.home', path: '/' },
    { key: 'header.nav.about', path: '/about' },
    { key: 'header.nav.programs', path: '/programs' },
    { key: 'header.nav.contact', path: '/contact' },
  ];

  readonly programLinks = PROGRAMS.map((program) => ({
    key: program.key + '.title',
    path: '/programs/' + program.id,
  }));

  // `icon` is an icon-font class (assets/icons/font-icons, `npm run generate-fonts`).
  readonly socials = [
    {
      label: 'Facebook',
      href: SOCIAL_LINKS.facebook,
      icon: 'icon-facebook',
    },
    {
      label: 'Instagram',
      href: SOCIAL_LINKS.instagram,
      icon: 'icon-instagram',
    },
  ];
}
