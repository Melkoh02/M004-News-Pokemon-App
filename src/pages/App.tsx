import React, {createContext} from 'react';
import {AppRegistry, Platform} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import SplashScreen from 'react-native-splash-screen';

import rootStore from '../../src/lib/stores/rootStore';
import {useStore} from '../lib/hooks/useStore.ts';
import {name as appName} from '../../app.json';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import Routes from '../routes/routes.tsx';
import {SnackbarProvider} from '../lib/providers/SnackBarProvider.tsx';

export const StoreContext = createContext(rootStore);

const PaperWrapper = observer(({children}: {children: React.ReactNode}) => (
  <PaperProvider theme={rootStore.themeStore.theme}>{children}</PaperProvider>
));

const AppContent = observer(() => {
  const {userStore} = useStore();

  React.useEffect(() => {
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

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <PaperWrapper>
        <SnackbarProvider>
          <AppContent />
        </SnackbarProvider>
      </PaperWrapper>
    </StoreContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);

export default App;
