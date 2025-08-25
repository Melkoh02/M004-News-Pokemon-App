import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsScreen from '../../pages/NewsScreen.tsx';
import NewsDetailScreen from '../../pages/NewsDetailScreen.tsx';
import type {NewsStackParamList} from '../../lib/types/navigation.ts';

const Stack = createNativeStackNavigator<NewsStackParamList>();

export default function NewsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
}
