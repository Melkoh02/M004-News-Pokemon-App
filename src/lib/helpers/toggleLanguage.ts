// src/lib/helpers/languageHelper.ts
import {LanguageStore} from '../stores/languageStore';

/**
 * Toggle between English ('en') and Spanish ('es')
 * and persist the choice via LanguageStore.
 */
export function toggleLanguage(store: LanguageStore) {
  const nextLang = store.language === 'en' ? 'es' : 'en';
  void store.setLanguage(nextLang);
}
