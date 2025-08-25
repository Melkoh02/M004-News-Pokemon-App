import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import NewsCard from '../components/organisms/newsCard.tsx';
import {Article} from '../lib/types/article.ts';

const PAGE_SIZE = 20;
const SOURCES = [
  'abc-news',
  'ars-technica',
  'cnn',
  'cbs-news',
  'bloomberg',
  'business-insider',
  'espn',
];

export default function NewsScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const api = useApi();

  const [data, setData] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);

  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  // guard to avoid multiple onEndReached fires during momentum
  const canLoadMoreRef = useRef(true);

  const hasNext = useMemo(() => {
    if (totalResults == null) return true;
    return data.length < totalResults;
  }, [data.length, totalResults]);

  const mergeUnique = (prev: Article[], next: Article[]) => {
    const seen = new Set(
      prev.map(a => a.url ?? `${a.title}-${a.publishedAt ?? ''}`),
    );
    const deduped = next.filter(a => {
      const key = a.url ?? `${a.title}-${a.publishedAt ?? ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return [...prev, ...deduped];
  };

  const fetchPage = useCallback(
    ({pageToLoad, append}: {pageToLoad: number; append: boolean}) => {
      append ? setLoadingMore(true) : setInitialLoading(true);

      api
        .getEverythingNews({
          language: 'en',
          sources: SOURCES,
          page: pageToLoad,
          pageSize: PAGE_SIZE,
        })
        .handle({
          onSuccess: res => {
            console.log('News API Called! page=', pageToLoad);
            setTotalResults(res.totalResults ?? null);

            setData(prev =>
              append ? mergeUnique(prev, res.articles) : res.articles,
            );
            setPage(pageToLoad);
          },
          errorMessage: t('snackBarMessages.getEverythingNewsError'),
          onFinally: () => {
            setInitialLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
            canLoadMoreRef.current = true;
          },
        });
    },
    [api, t],
  );

  // initial load
  useEffect(() => {
    fetchPage({pageToLoad: 1, append: false});
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!hasNext || initialLoading || loadingMore || refreshing) return;
    if (!canLoadMoreRef.current) return;
    canLoadMoreRef.current = false;

    // next page is current page + 1
    fetchPage({pageToLoad: page + 1, append: true});
  }, [fetchPage, hasNext, initialLoading, loadingMore, refreshing, page]);

  const onRefresh = useCallback(() => {
    if (initialLoading || loadingMore) return;
    setRefreshing(true);
    setTotalResults(null);
    // reset to page 1
    fetchPage({pageToLoad: 1, append: false});
  }, [fetchPage, initialLoading, loadingMore]);

  return (
    <>
      <MainSearchBar
        placeholder={t('news.searchBarPlaceHolder')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}>
        {initialLoading && data.length === 0 ? (
          <ActivityIndicator size={25} style={{paddingTop: 20}} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) =>
              item.url ?? `${item.title}-${item.publishedAt ?? index}`
            }
            renderItem={({item}) => (
              <NewsCard
                title={item.title}
                description={item.description}
                url={item.urlToImage}
              />
            )}
            contentContainerStyle={{padding: 16}}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              canLoadMoreRef.current = true;
            }}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator size={20} style={{paddingVertical: 16}} />
              ) : null
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            removeClippedSubviews
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
