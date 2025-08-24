import i18n, {LanguageDetectorAsyncModule, Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import es from './locales/es.json';
import {LANGUAGE_KEY as LANG_KEY} from '../lib/constants';

const resources: Resource = {
  en: {translation: en},
  es: {translation: es},
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,

  detect: async callback => {
    try {
      const stored = await AsyncStorage.getItem(LANG_KEY);
      if (stored) {
        callback(stored);
        return stored;
      }
      const locales = RNLocalize.getLocales();
      const match = locales.find(l =>
        Object.keys(resources).includes(l.languageCode),
      );
      const best = match?.languageCode ?? 'en';
      callback(best);
      return best;
    } catch {
      callback('en');
      return 'en';
    }
  },

  init: () => {
    /* no-op */
  },

  cacheUserLanguage: lang => {
    AsyncStorage.setItem(LANG_KEY, lang).catch(() => {});
  },
};

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(
    {
      resources,
      fallbackLng: 'en',
      react: {useSuspense: false},
    },
    () => {
      // ready
    },
  );

export default i18n;
