import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme} from '../../themes/light';
import {darkTheme} from '../../themes/dark';
import {THEME_KEY} from '../constants';

export type Scheme = 'light' | 'dark';

export class ThemeStore {
  /** Current colour-scheme */
  scheme: Scheme = 'light';

  constructor() {
    makeAutoObservable(this, {
      scheme: observable,
      toggle: action.bound,
      theme: false, // exclude the getter
    });

    // Load persisted preference or fallback to system theme
    void this.loadScheme();
  }

  /** Toggle between light/dark and persist the choice */
  toggle() {
    this.scheme = this.scheme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem(THEME_KEY, this.scheme).catch(() => {});
  }

  /** Paper-theme object that the UI actually consumes */
  get theme() {
    const base = this.scheme === 'light' ? lightTheme : darkTheme;
    return {
      ...base,
      scheme: this.scheme,
    };
  }

  private async loadScheme() {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        runInAction(() => {
          this.scheme = saved;
        });
      } else {
        const sys = Appearance.getColorScheme();
        runInAction(() => {
          this.scheme = sys === 'dark' ? 'dark' : 'light';
        });
      }
    } catch {
      // ignore load errors
    }
  }
}
