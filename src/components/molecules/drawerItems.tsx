import React from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import {
  Button,
  Drawer,
  Switch,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {useStore} from '../../lib/hooks/useStore.ts';
import {logStore} from '../../lib/helpers/logStore.ts';
import SelectLanguageModal from '../organisms/selectLanguageModal.tsx';

export default function DrawerItems() {
  const {t} = useTranslation();
  const theme = useTheme();
  const {themeStore, userStore} = useStore();
  const [selectLanguageModalVisible, setSelectLanguageModalVisible] =
    React.useState<boolean>(false);

  const isDarkTheme = theme.scheme === 'dark';

  const onOpen = (url: string) => Linking.openURL(url);

  const DrawerItemsData = [
    {
      key: 0,
      label: t('drawer.links.github'),
      icon: 'github',
      onPress: () => onOpen('https://github.com/Melkoh02/'),
    },
    {
      key: 1,
      label: t('drawer.links.template'),
      icon: 'source-repository',
      onPress: () => onOpen('https://github.com/Melkoh02/M001'),
    },
    {
      key: 2,
      label: t('drawer.links.contact'),
      icon: 'email',
      onPress: () => onOpen('mailto:contact@melkoh.dev'),
    },
    {
      key: 3,
      label: t('drawer.links.newsApi'),
      icon: 'newspaper-variant-outline',
      onPress: () => onOpen('https://newsapi.org/docs'),
    },
    {
      key: 4,
      label: t('drawer.links.pokeApi'),
      icon: 'pokeball',
      onPress: () => onOpen('https://pokeapi.co/docs/v2'),
    },
  ];

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        paddingTop: 0,
        paddingBottom: 0,
      }}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Drawer.Section title={t('drawer.links.title', 'Links')}>
            {DrawerItemsData.map(({key, ...item}, index) => (
              <Drawer.Item
                key={key}
                {...item}
                onPress={() => {
                  item.onPress?.();
                }}
              />
            ))}
          </Drawer.Section>

          <Drawer.Section title={t('drawer.preferences')}>
            <Drawer.Item
              icon={'earth'}
              onPress={() => setSelectLanguageModalVisible(true)}
              label={t('drawer.language')}
            />
            <TouchableRipple onPress={themeStore.toggle}>
              <View style={styles.preference}>
                <Text variant="labelLarge">{t('drawer.darkTheme')}</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>

          <Drawer.Section title={'Dev tools'} showDivider={true}>
            <TouchableRipple onPress={logStore}>
              <View style={{paddingHorizontal: 28}}>
                <Text variant="labelLarge">Log store values</Text>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>

        <Drawer.Section showDivider={false}>
          <Button
            onPress={userStore.logout}
            textColor={theme.colors.error}
            style={styles.logout}>
            {t('settings.logout')}
          </Button>
        </Drawer.Section>

        <SelectLanguageModal
          isVisible={selectLanguageModalVisible}
          onDismiss={() => setSelectLanguageModalVisible(false)}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    height: 56,
  },
  badge: {
    alignSelf: 'center',
  },
  logout: {
    paddingBottom: 16,
  },
});
