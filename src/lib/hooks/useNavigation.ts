import {useNavigation as useDefaultNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {
  AuthStackParamList,
  NewsStackParamList,
  PokemonStackParamList,
} from '../types/navigation';

type StackName = 'AuthStack' | 'NewsStack' | 'PokemonStack';

type NavMap = {
  AuthStack: NativeStackNavigationProp<AuthStackParamList>;
  NewsStack: NativeStackNavigationProp<NewsStackParamList>;
  PokemonStack: NativeStackNavigationProp<PokemonStackParamList>;
};

export function useNavigation(stack: 'AuthStack'): NavMap['AuthStack'];
export function useNavigation(stack: 'NewsStack'): NavMap['NewsStack'];
export function useNavigation(stack: 'PokemonStack'): NavMap['PokemonStack'];

export function useNavigation(stack: StackName) {
  switch (stack) {
    case 'AuthStack':
      return useDefaultNavigation<NavMap['AuthStack']>();
    case 'NewsStack':
      return useDefaultNavigation<NavMap['NewsStack']>();
    case 'PokemonStack':
      return useDefaultNavigation<NavMap['PokemonStack']>();
    default:
      return useDefaultNavigation<NativeStackNavigationProp<{}>>();
  }
}
