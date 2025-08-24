import {makeAutoObservable, runInAction} from 'mobx';
import i18n from '../../localization';

export class LanguageStore {
  /** Currently active language code (e.g. 'en', 'es') */
  language: string = i18n.language;

  constructor() {
    makeAutoObservable(this);

    // Keep our `language` in sync with i18next internals
    i18n.on('languageChanged', (lng: string) => {
      runInAction(() => {
        this.language = lng;
      });
    });
  }

  /**
   * Change the app language. Also persists via our detector.
   */
  async setLanguage(lang: string) {
    await i18n.changeLanguage(lang);
  }
}
