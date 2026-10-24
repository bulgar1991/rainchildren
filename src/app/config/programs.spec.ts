import { TRANSLATIONS } from '../../testing/translations';
import { PROGRAMS } from './programs';

// Walks 'a.b.c' through a translation object.
const lookup = (translations: object, key: string): unknown =>
  key
    .split('.')
    .reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], translations);

describe('PROGRAMS', () => {
  for (const [lang, translations] of Object.entries(TRANSLATIONS)) {
    for (const program of PROGRAMS) {
      it(`should have every ${program.id} text in ${lang}`, () => {
        const keys = [
          ...['title', 'desc', 'a1', 'a2', 'a3'].map((field) => program.key + '.' + field),
          ...['title', 'description'].map((field) => program.seo + '.' + field),
        ];
        for (const key of keys) {
          const text = lookup(translations, key);
          expect(typeof text === 'string' && text.trim() !== '', `${lang}: ${key}`).toBe(true);
        }
      });
    }
  }
});
