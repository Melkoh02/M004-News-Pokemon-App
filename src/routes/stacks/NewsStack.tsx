import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsScreen from '../../pages/NewsScreen.tsx';

const Stack = createNativeStackNavigator();

export default function NewsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="News" component={NewsScreen} />
    </Stack.Navigator>
  );
}
