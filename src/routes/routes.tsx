import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './stacks/AuthStack.tsx';
import {observer} from 'mobx-react-lite';
import MainDrawer from '../components/molecules/drawer.tsx';
import {StoreContext} from '../pages/App.tsx';

function Routes() {
  const {userStore} = React.useContext(StoreContext);
  const isLoggedIn = Boolean(userStore.accessToken);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default observer(Routes);
