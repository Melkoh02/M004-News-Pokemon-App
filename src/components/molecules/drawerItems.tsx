import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Badge,
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
  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);
  const [selectLanguageModalVisible, setSelectLanguageModalVisible] =
    React.useState<boolean>(false);

  const isDarkTheme = theme.scheme === 'dark';

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const DrawerItemsData = [
    {
      label: 'Inbox',
      icon: 'inbox',
      key: 0,
      right: () => <Text variant="labelLarge">44</Text>,
    },
    {
      label: 'Starred',
      icon: 'star',
      key: 1,
      right: ({color}: {color: string}) => (
        <Badge
          visible
          size={8}
          style={[styles.badge, {backgroundColor: color}]}
        />
      ),
    },
    {label: 'Sent mail', icon: 'send', key: 2},
    {label: 'Colored label', icon: 'palette', key: 3},
    {
      label: 'A very long title that will be truncated',
      icon: 'delete',
      key: 4,
      right: () => <Badge visible size={8} style={styles.badge} />,
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
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Drawer.Section title="Example items">
            {DrawerItemsData.map((props, index) => (
              <Drawer.Item
                {...props}
                key={props.key}
                active={drawerItemIndex === index}
                onPress={() => _setDrawerItem(index)}
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
