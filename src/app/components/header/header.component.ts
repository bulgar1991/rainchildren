import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface NavItem {
  key: string;
  path: string;
}

interface Lang {
  code: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  activeLang = signal('ro');

  readonly donateUrl = 'https://www.paypal.com/donate/?hosted_button_id=RAINCHILDREN';

  readonly navItems: NavItem[] = [
    { key: 'header.nav.home', path: '/' },
    { key: 'header.nav.about', path: '/about' },
    { key: 'header.nav.programs', path: '/programs' },
    { key: 'header.nav.events', path: '/events' },
    { key: 'header.nav.contact', path: '/contact' },
  ];

  readonly langs: Lang[] = [
    { code: 'ro', label: 'RO', flag: '🇲🇩' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
  ];

  ngOnInit() {
    this.translate.use('ro');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isMenuOpen()) this.closeMenu();
  }

  openMenu() {
    this.isMenuOpen.set(true);
    this.document.body.classList.add('sidebar-open');
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.document.body.classList.remove('sidebar-open');
  }

  toggleMenu() {
    this.isMenuOpen() ? this.closeMenu() : this.openMenu();
  }

  switchLang(code: string) {
    this.activeLang.set(code);
    this.translate.use(code);
  }
}
