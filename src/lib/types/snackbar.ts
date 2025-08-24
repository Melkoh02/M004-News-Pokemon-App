export type SnackbarProps = {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
  style?: object;
  duration?: number | undefined;
  showCloseIcon?: boolean;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  action?: {
    label: string;
    onPress: () => void;
  };
};
