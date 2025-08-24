import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useStore} from '../../lib/hooks/useStore';
import BaseModal from '../molecules/modal';
import SelectInput from '../molecules/selectInput';
import {LanguageModalProps} from '../../lib/types/selectLanguageModal';
import {SUPPORTED_LANGUAGES} from '../../lib/constants/languages';
import {SelectInputOptionsProp} from '../../lib/types/selectInput.ts';

export default function SelectLanguageModal({
  isVisible,
  onDismiss,
}: LanguageModalProps) {
  const {t} = useTranslation();
  const {languageStore} = useStore();

  // Local state to stage the choice before confirm:
  const [selectedLang, setSelectedLang] = useState(languageStore.language);

  // Map the constant list into `Option[]` for SelectInput:
  const languageOptions: SelectInputOptionsProp[] = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map(lang => ({
        id: lang.id,
        value: t(lang.labelKey),
      })),
    [t],
  );

  useEffect(() => {
    if (isVisible) {
      setSelectedLang(languageStore.language);
    }
  }, [isVisible, languageStore.language]);

  return (
    <BaseModal
      title={t('modals.selectLanguageModal.title')}
      content={
        <SelectInput
          value={selectedLang}
          onChange={setSelectedLang}
          placeholder={t('modals.selectLanguageModal.placeholder')}
          options={languageOptions}
          style={styles.select}
        />
      }
      isVisible={isVisible}
      onDismiss={onDismiss}
      actions={[
        {
          text: t('common.cancel'),
          onPress: onDismiss,
        },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await languageStore.setLanguage(selectedLang);
            onDismiss();
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  select: {
    marginTop: 16,
    backgroundColor: 'transparent',
  },
});
