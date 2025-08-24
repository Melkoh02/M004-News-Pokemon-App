import {useTheme as useThemePaper} from 'react-native-paper';
import {lightTheme} from '../../themes/light.ts';

export type AppTheme = typeof lightTheme;

export const useTheme = () => useThemePaper<AppTheme>();
