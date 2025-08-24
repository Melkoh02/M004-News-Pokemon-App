import {action, computed, makeAutoObservable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/user';
import {USER_STORAGE_KEY} from '../constants';
import {AuthResponse} from '../types/api.ts';

export class UserStore {
  user: User | null = null;
  accessToken: string | null = null;
  refreshToken: string | null = null;
  isHydrated = false;

  constructor() {
    makeAutoObservable(this, {
      authHeader: computed,
      setAuth: action.bound,
      logout: action.bound,
    });
    this.hydrate();
  }

  /**
   * Computed helper that builds the Authorization header.
   */
  get authHeader(): {Authorization?: string} {
    return this.accessToken
      ? {Authorization: `Bearer ${this.accessToken}`}
      : {};
  }

  /**
   * Populate the store with tokens and user data returned from login.
   */
  setAuth({access, refresh, user}: AuthResponse) {
    this.accessToken = access;
    this.refreshToken = refresh;
    this.user = user;
    AsyncStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({access, refresh, user}),
    ).catch(console.warn);
  }

  /**
   * Clears all authentication and user data.
   */
  logout() {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    AsyncStorage.removeItem(USER_STORAGE_KEY).catch(console.warn);
  }

  /** Load saved auth from AsyncStorage */
  private async hydrate() {
    try {
      const json = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (json) {
        const {access, refresh, user}: AuthResponse = JSON.parse(json);
        runInAction(() => {
          this.accessToken = access;
          this.refreshToken = refresh;
          this.user = user;
        });
      }
    } catch (e) {
      console.warn('UserStore hydration failed', e);
    } finally {
      runInAction(() => {
        this.isHydrated = true;
      });
    }
  }
}
