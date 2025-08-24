import {MD3LightTheme} from 'react-native-paper';
import {sharedColors} from './sharedColors';

export const lightTheme = {
  ...MD3LightTheme,
  scheme: 'light',
  colors: {
    ...MD3LightTheme.colors,
    ...sharedColors,
  },
};
