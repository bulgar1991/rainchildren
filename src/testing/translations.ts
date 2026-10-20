import { Provider } from '@angular/core';
import {
  TranslateLoader,
  TranslationObject,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import en from '../assets/i18n/en.json';
import ro from '../assets/i18n/ro.json';
import ru from '../assets/i18n/ru.json';
import { LanguageCode } from '@services/language.service';

export const TRANSLATIONS: Record<LanguageCode, TranslationObject> = { ro, en, ru };

// Serves the real translation files synchronously, so tests don't need HTTP.
class JsonLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(TRANSLATIONS[lang as LanguageCode]);
  }
}

/** Translations for TestBed, using the real assets/i18n/*.json files. */
export function provideTestTranslations(lang: LanguageCode = 'en'): Provider[] {
  return provideTranslateService({
    loader: provideTranslateLoader(JsonLoader),
    lang,
    fallbackLang: lang,
  });
}
