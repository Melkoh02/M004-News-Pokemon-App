import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import Config from 'react-native-config';
import rootStore from '../lib/stores/rootStore.ts';
import i18n from 'i18next';

// --------------- Multi-client setup ---------------
export type Service = 'backend' | 'news' | 'pokemon';

function makeClient(baseURL?: string) {
  return axios.create({baseURL});
}

const clients: Record<Service, AxiosInstance> = {
  backend: makeClient(Config.API_BASE_URL_BACKEND),
  news: makeClient(Config.API_BASE_URL_NEWS),
  pokemon: makeClient(Config.API_BASE_URL_POKEMON),
};

// Attach per-service request interceptors
clients.backend.interceptors.request.use(
  config => {
    const token = rootStore.userStore.accessToken;
    if (token) {
      const headers = new AxiosHeaders(config.headers);
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
    }
    return config;
  },
  error => Promise.reject(error),
);

clients.news.interceptors.request.use(
  config => {
    const headers = new AxiosHeaders(config.headers);
    // NewsAPI requires `x-api-key`
    headers.set('x-api-key', Config.API_KEY_NEWS);
    config.headers = headers;
    return config;
  },
  error => Promise.reject(error),
);

// PokeAPI needs no auth, but we keep the hook for future tweaks if needed
clients.pokemon.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

// --------------- RequestWrapper & helper ---------------
export type HandleOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  successMessage?: string;
  errorMessage?: string;
  onFinally?: () => void;
  showBackendMessage?: boolean;
};

export type ApiErrorData = {
  localKey?: string;
};

class RequestWrapper<T> {
  constructor(private promise: Promise<AxiosResponse<T>>) {}

  handle(opts: HandleOptions<T> = {}) {
    this.promise
      .then(res => {
        if (opts.successMessage) {
          rootStore.uiStore.showSnackbar(opts.successMessage, 'success');
        }
        opts.onSuccess?.(res.data);
      })
      .catch((err: AxiosError<ApiErrorData>) => {
        // HTTP error (server responded with 4xx/5xx)
        if (!!err.response) {
          if (opts.errorMessage) {
            rootStore.uiStore.showSnackbar(opts.errorMessage, 'danger');
          } else if (err && err.response?.data?.localKey) {
            rootStore.uiStore.showSnackbar(
              i18n.t(err.response?.data?.localKey),
              'danger',
            );
            opts.onError?.(err);
          }
        } else {
          // Network / no-response error
          rootStore.uiStore.showSnackbar(
            i18n.t('snackBarMessages.networkError'),
            'danger',
          );
        }
      })
      .finally(() => {
        opts.onFinally?.();
      });
  }
}

/**
 * Wrap any Axios call so it gains a .handle() method.
 */
export function wrapRequest<T>(p: Promise<AxiosResponse<T>>) {
  return new RequestWrapper<T>(p);
}

// --------------- Exports ---------------
// Back-compat: keep default export pointing to the backend client
const client = clients.backend;
export default client;

// Named exports for other services
export const newsClient = clients.news;
export const pokemonClient = clients.pokemon;
