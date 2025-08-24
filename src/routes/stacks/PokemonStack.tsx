import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonScreen from '../../pages/PokemonScreen.tsx';

const Stack = createNativeStackNavigator();

export default function PokemonStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
}
