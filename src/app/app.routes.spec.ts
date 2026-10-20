import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PROGRAMS } from '@/config/programs';
import { TRAINING_PLACES } from '@/config/locations';
import { provideTestTranslations } from '../testing/translations';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';

describe('routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes, withComponentInputBinding()), provideTestTranslations()],
    });
    harness = await RouterTestingHarness.create();
  });

  const page = () => harness.routeNativeElement as HTMLElement;
  const heading = () => page().querySelector('h1')?.textContent?.trim();

  it('should open a program at /programs/:id', async () => {
    await harness.navigateByUrl('/programs/' + PROGRAMS[0].id);

    expect(heading()).toBe('Football');
    expect(page().querySelectorAll('.detail__list-item').length).toBe(3);
  });

  it('should not have the removed blog and events pages anymore', async () => {
    for (const url of ['/blog', '/events', '/events/gala-caritabila-2026']) {
      await harness.navigateByUrl(url);
      expect(TestBed.inject(Router).url).toBe('/404');
    }
  });

  it('should show both bank accounts on /donate', async () => {
    await harness.navigateByUrl('/donate');

    expect(heading()).toBe('Donate');
    expect(page().textContent).toContain('MD18 AG00 0000 0225 1586 7335');
    expect(page().textContent).toContain('MD55 AG00 0000 0225 1586 7348');
    expect(TestBed.inject(Title).getTitle()).toBe('Donate — Rain Children');
  });

  it('should list the training places with map links in the FAQ', async () => {
    await harness.navigateByUrl('/');
    const links = [...page().querySelectorAll<HTMLAnchorElement>('.faq__place-link')];

    expect(links.map((a) => a.href)).toEqual(TRAINING_PLACES.map((place) => place.mapUrl));
    expect(page().textContent).toContain('“La Izvor” multi-purpose court');
  });

  it('should show a pin for every training place on the /contact map', async () => {
    await harness.navigateByUrl('/contact');

    // Leaflet is loaded lazily, so wait for the pins.
    await vi.waitFor(() =>
      expect(page().querySelectorAll('.training-map__pin').length).toBe(TRAINING_PLACES.length),
    );
    const links = [...page().querySelectorAll<HTMLAnchorElement>('.contact-places__link')];
    expect(links.map((a) => a.href)).toEqual(TRAINING_PLACES.map((place) => place.mapUrl));
  });

  it('should show the football, basketball and gymnastics animations on the home page', async () => {
    await harness.navigateByUrl('/');
    const scenes = [...page().querySelectorAll('app-sport-showcase app-sport-scene svg')];

    expect(scenes.map((svg) => svg.getAttribute('class'))).toEqual([
      'scene scene--football',
      'scene scene--basketball',
      'scene scene--gymnastics',
    ]);
  });

  it('should show the matching animation on each program page', async () => {
    for (const [id, scene] of [
      ['fotbal', 'scene--football'],
      ['baschet', 'scene--basketball'],
      ['gimnastica', 'scene--gymnastics'],
    ]) {
      await harness.navigateByUrl('/programs/' + id);
      const svg = page().querySelector('app-sport-scene svg');
      expect(svg?.classList.contains(scene!)).toBe(true);
    }
  });

  it('should show each program its own photo banner', async () => {
    for (const program of PROGRAMS) {
      await harness.navigateByUrl('/programs/' + program.id);
      const banner = page().querySelector<HTMLImageElement>('.page-hero--photo .page-hero__bg');
      expect(banner?.getAttribute('src')).toBe(program.banner);
      expect(page().querySelector('.detail-hero__icon i')?.className).toBe(program.bannerIcon);
    }
    expect(new Set(PROGRAMS.map((program) => program.banner)).size).toBe(PROGRAMS.length);
  });

  describe('SEO', () => {
    const meta = (selector: string) => TestBed.inject(Meta).getTag(selector)?.content;
    const canonical = () =>
      TestBed.inject(DOCUMENT).querySelector('link[rel="canonical"]')?.getAttribute('href');

    it('should set the description, canonical link and social tags of a page', async () => {
      await harness.navigateByUrl('/donate');

      expect(meta("name='description'")).toContain('bank transfer in MDL or USD');
      expect(canonical()).toBe('https://rainchildren.md/donate');
      expect(meta("property='og:url'")).toBe('https://rainchildren.md/donate');
      expect(meta("property='og:title'")).toBe('Donate — Rain Children');
      expect(meta("property='og:image'")).toBe(
        'https://rainchildren.md/assets/images/seo/og-image.jpg',
      );
      expect(meta("name='robots'")).toContain('index, follow');
    });

    it('should use the program photo when a program page is shared', async () => {
      await harness.navigateByUrl('/programs/' + PROGRAMS[0].id);

      expect(TestBed.inject(Title).getTitle()).toBe('Football — Rain Children');
      expect(meta("property='og:type'")).toBe('article');
      expect(meta("property='og:image'")).toBe(
        'https://rainchildren.md/assets/images/prog-football.jpg',
      );
      expect(canonical()).toBe('https://rainchildren.md/programs/' + PROGRAMS[0].id);
    });

    it('should keep the 404 page out of search results', async () => {
      await harness.navigateByUrl('/does-not-exist');

      expect(meta("name='robots'")).toBe('noindex, follow');
    });

    it('should translate the title again when the language changes', async () => {
      await harness.navigateByUrl('/gallery');
      expect(TestBed.inject(Title).getTitle()).toBe('Gallery — Rain Children');

      await firstValueFrom(TestBed.inject(TranslateService).use('ro'));
      expect(TestBed.inject(Title).getTitle()).toBe('Galerie — Rain Children');
      expect(meta("property='og:locale'")).toBe('ro_RO');
    });
  });

  it('should send unknown ids to the 404 page', async () => {
    for (const section of ['programs']) {
      await harness.navigateByUrl(`/${section}/does-not-exist`);
      expect(TestBed.inject(Router).url).toBe('/404');
    }
  });
});
