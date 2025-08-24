import React from 'react';

export type ModalAction = {
  text: string;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  style?: object;
};

export type BaseModalProps = {
  isVisible?: boolean;
  onDismiss?: () => void;
  title: string;
  titleStyle?: object;
  content: React.ReactNode;
  contentStyle?: object;
  actions?: ModalAction[];
};
