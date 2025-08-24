import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonScreen from '../../pages/PokemonScreen';
import PokemonDetailScreen from '../../pages/PokemonDetailScreen';
import type {PokemonStackParamList} from '../../lib/types/navigation';

const Stack = createNativeStackNavigator<PokemonStackParamList>();

export default function PokemonStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
      <Stack.Screen
        name="PokemonDetailScreen"
        component={PokemonDetailScreen}
      />
    </Stack.Navigator>
  );
}
