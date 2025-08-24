import React, {createContext} from 'react';
import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import App from './src/pages/App';
import rootStore from './src/lib/stores/rootStore';
import {name as appName} from './app.json';
import {SnackbarProvider} from './src/lib/providers/SnackBarProvider.tsx';

export const StoreContext = createContext(rootStore);

const PaperWrapper = observer(({children}: {children: React.ReactNode}) => (
  <PaperProvider theme={rootStore.themeStore.theme}>{children}</PaperProvider>
));

function Main() {
  return (
    <StoreContext.Provider value={rootStore}>
      <PaperWrapper>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </PaperWrapper>
    </StoreContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
