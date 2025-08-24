import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerItems from './drawerItems.tsx';
import TabNavigator from '../../routes/TabNavigator.tsx';
import {DrawerParamList} from '../../lib/types/navigation.ts';

const MainDrawer = () => {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerItems />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '50%'},
      }}>
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
