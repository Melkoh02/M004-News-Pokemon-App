import axios, {AxiosError, AxiosHeaders, AxiosResponse} from 'axios';
import Config from 'react-native-config';
import rootStore from '../lib/stores/rootStore.ts';
import i18n from 'i18next';

// --------------- Axios instance ---------------
const client = axios.create({
  baseURL: Config.API_BASE_URL,
});

client.interceptors.request.use(
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

export default client;
