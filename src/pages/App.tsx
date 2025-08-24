import {useEffect} from 'react';
import {Platform} from 'react-native';
import {observer} from 'mobx-react-lite';
import SplashScreen from 'react-native-splash-screen';

import BaseLayout from '../components/templates/BaseLayout';
import Routes from '../routes/routes';
import {useStore} from '../lib/hooks/useStore.ts';

export default observer(function App() {
  const {userStore} = useStore();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, [userStore.isHydrated]);

  return (
    <BaseLayout>
      <Routes />
    </BaseLayout>
  );
});
