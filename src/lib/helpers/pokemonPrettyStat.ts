import {capitalizeString} from './capitalizeString.ts';
import i18n from 'i18next';

export function prettyStat(k: string) {
  const map: Record<string, string> = {
    hp: 'HP',
    attack: i18n.t('pokemon.attack'),
    defense: i18n.t('pokemon.defense'),
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: i18n.t('pokemon.speed'),
  };
  return map[k] ?? capitalizeString(k.replace('-', ' '));
}
