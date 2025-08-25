import client, {newsClient, pokemonClient, wrapRequest} from './client';

export const login = (data: {[key: string]: any}) => {
  return wrapRequest(client.post('/authenticate/', data));
};

export const signUp = (data: {[key: string]: any}) => {
  return wrapRequest(client.post('/users/', data));
};
export const forgotPassword = (data: {[key: string]: any}) => {
  return wrapRequest(client.post('forgot_password_code', data));
};

// ---------- NewsAPI ----------
/**
 * Example usage:
 * api.topHeadlines({ country: 'us', category: 'technology' })
 */
export const getTopHeadlines = (params: {
  country?: string;
  category?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}) => wrapRequest(newsClient.get('top-headlines', {params}));

export const getEverythingNews = (params: {
  q?: string;
  language?: string;
  from?: string; // ISO date
  to?: string; // ISO date
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
  sources?: string[];
  searchIn?: string;
}) => wrapRequest(newsClient.get('everything', {params}));

// ---------- PokeAPI ----------
export const getPokemon = (id: number) =>
  wrapRequest(pokemonClient.get(`pokemon/${id}`));

export const listPokemon = (params?: {limit?: number; offset?: number}) =>
  wrapRequest(pokemonClient.get('pokemon', {params}));
