import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestTranslations } from '../testing/translations';
import { App } from './app';
import { SOCIAL_LINKS } from '@/config/site';
import { CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from '@/config/contact';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideTestTranslations()],
    }).compileComponents();
  });

  it('should create the app with the header, page outlet and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should link the footer to the Rain Children Facebook and Instagram pages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>(
        '.footer__social',
      ),
    ].map((a) => a.href);

    expect(links).toEqual([SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram]);
  });

  it('should show the real phone and email in the footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const footer = (fixture.nativeElement as HTMLElement).querySelector('app-footer')!;

    expect(CONTACT_PHONE_HREF).toBe('tel:+37369396519');
    expect(footer.querySelector(`a[href="${CONTACT_PHONE_HREF}"]`)?.textContent?.trim()).toBe(
      '+373 69 396 519',
    );
    expect(footer.querySelector(`a[href="${CONTACT_EMAIL_HREF}"]`)?.textContent?.trim()).toBe(
      'rainchildren.md@mail.ru',
    );
  });
});
