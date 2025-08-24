import React from 'react';
import {StatusBar, View} from 'react-native';
import {
  Edge,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {useTheme} from '../../lib/hooks/useAppTheme';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const insetsEdges: Edge[] = ['top'];

const BaseLayout = ({children}: BaseLayoutProps) => {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={insetsEdges}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={theme.scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BaseLayout;
