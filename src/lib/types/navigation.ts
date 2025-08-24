import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export type DrawerParamList = {
  MainTabs: undefined;
  // here goes drawer-only screens if added more in the future.
};

export type TabParamList = {
  HomeTab: undefined;
  SettingsTab: undefined;
  // here goes bottom-tabs-only screens if added more in the future.
};

export type SearchBarNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeTab'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};
