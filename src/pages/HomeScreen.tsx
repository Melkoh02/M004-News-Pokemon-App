import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import MainFab from '../components/molecules/fab.tsx';
import {Button} from 'react-native-paper';
import useApi from '../lib/hooks/useApi.ts';

export default function HomeScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const api = useApi();

  const getNews = () => {
    api.getTopHeadlines({country: 'us'}).handle({
      onSuccess: data => console.log('news:', data),
      errorMessage: t('snackBarMessages.getEverythingNewsError'),
    });
  };

  return (
    <>
      <MainSearchBar />
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}>
        <Text style={{color: theme.colors.primary, padding: 10}}>
          {t('home.title')}
        </Text>
        <Button mode={'contained'} onPress={getNews}>
          Press to get news!
        </Button>
        <MainFab />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {marginTop: 16},
});
