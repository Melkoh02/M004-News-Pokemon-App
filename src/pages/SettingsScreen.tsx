import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {useTheme} from '../lib/hooks/useAppTheme';

const SettingsScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.title, {color: theme.colors.primary}]}>
        {t('settings.title')}
      </Text>
    </View>
  );
};

export default observer(SettingsScreen);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {padding: 10},
  button: {marginTop: 16},
});
