import {StyleSheet, ViewStyle} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {SnackbarProps} from '../../lib/types/snackbar.ts';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';

export default function MainSnackbar({
  message,
  isVisible,
  style = {},
  onDismiss,
  showCloseIcon,
  action,
  variant,
  duration = 3000, // in milliseconds
  ...rest
}: SnackbarProps) {
  const theme = useTheme();
  const stripeStyle = variant
    ? {borderLeftWidth: 4, borderLeftColor: theme.colors[variant]}
    : {};

  return (
    <Snackbar
      visible={isVisible}
      onDismiss={onDismiss} // runs always on dismiss
      action={action ? action : undefined} // also triggers onDismiss
      duration={duration}
      style={[styles.snackbar, stripeStyle, style] as ViewStyle[]}
      onIconPress={showCloseIcon ? onDismiss : undefined}
      {...rest}>
      {message}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
