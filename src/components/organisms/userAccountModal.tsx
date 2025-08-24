import React from 'react';
import {useTranslation} from 'react-i18next';
import BaseModal from '../molecules/modal';
import {UserAccountModalProps} from '../../lib/types/userAccountModal';
import {Text} from 'react-native-paper';

export default function UserAccountModal({
  isVisible,
  onDismiss,
}: UserAccountModalProps) {
  const {t} = useTranslation();

  return (
    <BaseModal
      title={t('modals.userAccount.title')}
      content={<Text>Hello there!</Text>}
      isVisible={isVisible}
      onDismiss={onDismiss}
    />
  );
}
