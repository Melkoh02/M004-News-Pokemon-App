import {MD3DarkTheme} from 'react-native-paper';
import {sharedColors} from './sharedColors';

export const darkTheme = {
  ...MD3DarkTheme,
  scheme: 'dark',
  colors: {
    ...MD3DarkTheme.colors,
    ...sharedColors,
  },
};
