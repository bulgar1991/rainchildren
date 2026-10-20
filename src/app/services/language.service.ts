import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type LanguageCode = 'ro' | 'en' | 'ru';

export interface Language {
  code: LanguageCode;
  label: string;
  flag: string;
}

// Order matters: this is the order shown in the language switcher.
export const LANGUAGES: Language[] = [
  { code: 'ro', label: 'RO', flag: '🇲🇩' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'ro';

const STORAGE_KEY = 'rainchildren-lang';

/** Switches the site language (translations in src/assets/i18n/*.json) and remembers the choice. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  readonly languages = LANGUAGES;
  readonly current = this.translate.currentLang;

  // Called once on app start, before the first render.
  init(): Observable<unknown> {
    return this.use(this.savedLanguage() ?? DEFAULT_LANGUAGE);
  }

  use(code: LanguageCode): Observable<unknown> {
    this.document.documentElement.lang = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage can be blocked (private mode); the language just won't be remembered.
    }
    return this.translate.use(code);
  }

  private savedLanguage(): LanguageCode | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.some((lang) => lang.code === saved) ? (saved as LanguageCode) : null;
    } catch {
      return null;
    }
  }
}
