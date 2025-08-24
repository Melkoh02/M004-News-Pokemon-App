import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import NewsCard from '../components/organisms/newsCard.tsx';
import {Article} from '../lib/types/article.ts';

export default function NewsScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const getNews = () => {
    setLoading(true);
    api.getTopHeadlines({country: 'us'}).handle({
      onSuccess: res => {
        setData(res.articles);
      },
      errorMessage: t('snackBarMessages.getEverythingNewsError'),
      onFinally: () => setLoading(false),
    });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <MainSearchBar />
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.url ?? index.toString()}
            renderItem={({item}) => (
              <NewsCard
                title={item.title}
                description={item.description}
                url={item.urlToImage}
              />
            )}
            contentContainerStyle={{padding: 16}}
          />
        ) : (
          <ActivityIndicator size={25} style={{paddingTop: 20}} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {marginTop: 16},
});
