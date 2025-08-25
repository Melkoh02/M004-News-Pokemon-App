import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Article} from './article.ts';

export type DrawerParamList = {
  MainTabs: undefined;
  // here goes drawer-only screens if added more in the future.
};

export type TabParamList = {
  NewsTab: undefined;
  PokemonTab: undefined;
  // here goes bottom-tabs-only screens if added more in the future.
};

export type SearchBarNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'NewsTab'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type NewsStackParamList = {
  News: undefined;
  NewsDetailScreen: {article: Article};
};

export type PokemonStackParamList = {
  Pokemon: undefined;
  PokemonDetailScreen: {id: number};
};
