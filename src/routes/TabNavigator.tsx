import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsStack from './stacks/NewsStack.tsx';
import PokemonStack from './stacks/PokemonStack.tsx';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BottomNavigation} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {TabParamList} from '../lib/types/navigation.ts';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          style={{height: 80}}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24,
            }) || null
          }
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            return typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
              ? options.title
              : route.name;
          }}
        />
      )}>
      <Tab.Screen
        name="NewsTab"
        component={NewsStack}
        options={{
          tabBarLabel: t('tabNavigator.home'),
          tabBarIcon: ({color, size}) => (
            <Icon name="article" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PokemonTab"
        component={PokemonStack}
        options={{
          tabBarLabel: t('tabNavigator.settings'),
          tabBarIcon: ({color, size}) => (
            <Icon name="catching-pokemon" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
