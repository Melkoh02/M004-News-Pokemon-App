import {UserStore} from './userStore.ts';
import {ThemeStore} from './themeStore.ts';
import {LanguageStore} from './languageStore.ts';
import {UIStore} from './uiStore.ts';

export class RootStore {
  userStore: UserStore;
  themeStore: ThemeStore;
  languageStore: LanguageStore;
  uiStore: UIStore;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
    this.languageStore = new LanguageStore();
    this.uiStore = new UIStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
