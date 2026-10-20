import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageCode, LanguageService } from '@services/language.service';

interface NavItem {
  key: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly language = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  readonly activeLang = this.language.current;

  readonly navItems: NavItem[] = [
    { key: 'header.nav.home', path: '/' },
    { key: 'header.nav.about', path: '/about' },
    { key: 'header.nav.programs', path: '/programs' },
    { key: 'header.nav.contact', path: '/contact' },
  ];

  readonly langs = this.language.languages;

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
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  switchLang(code: LanguageCode) {
    this.language.use(code);
  }
}
