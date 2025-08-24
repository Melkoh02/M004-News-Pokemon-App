export interface LanguageOption {
  id: string; // the i18n code, e.g. 'en', 'es'
  labelKey: string; // the translation key for the language’s display name
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {id: 'en', labelKey: 'modals.selectLanguageModal.languages.en'},
  {id: 'es', labelKey: 'modals.selectLanguageModal.languages.es'},
  // later: { id: 'fr', labelKey: 'modals.selectLanguageModal.languages.fr' }, …
];
