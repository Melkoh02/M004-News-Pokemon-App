import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import NewsCard from '../components/organisms/newsCard.tsx';
import {Article} from '../lib/types/article.ts';
import {NEWS_PAGE_SIZE} from '../lib/constants/pagination.ts';
import {NEWS_SOURCES} from '../lib/constants/newsSoruces.ts';

const MIN_QUERY_CHARS = 2;

// simple debounce hook
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

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

  // debounce to avoid hammering the API as the user types
  const debouncedQuery = useDebouncedValue(searchQuery, 400);
  const normalizedQuery = debouncedQuery.trim();
  const isShortQuery =
    normalizedQuery.length > 0 && normalizedQuery.length < MIN_QUERY_CHARS;
  const q =
    !isShortQuery && normalizedQuery.length ? normalizedQuery : undefined;

  // guard to avoid multiple onEndReached fires during momentum
  const canLoadMoreRef = useRef(true);

  // request ID so late responses don't clobber current data
  const requestIdRef = useRef(0);

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
    ({
      pageToLoad,
      append,
      query,
    }: {
      pageToLoad: number;
      append: boolean;
      query?: string;
    }) => {
      const isAppend = append;
      isAppend ? setLoadingMore(true) : setInitialLoading(true);

      const rid = ++requestIdRef.current;

      api
        .getEverythingNews({
          language: 'en',
          sources: NEWS_SOURCES,
          page: pageToLoad,
          pageSize: NEWS_PAGE_SIZE,
          q: query,
        })
        .handle({
          onSuccess: res => {
            if (rid !== requestIdRef.current) return;

            console.log('News API Called! page=', pageToLoad, 'q=', query);
            setTotalResults(res.totalResults ?? null);
            setData(prev =>
              isAppend ? mergeUnique(prev, res.articles) : res.articles,
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

  useEffect(() => {
    if (isShortQuery) {
      requestIdRef.current++;

      setInitialLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
      canLoadMoreRef.current = true;

      setData([]);
      setTotalResults(0);
      setPage(1);
      return;
    }

    setTotalResults(null);
    setData([]);
    fetchPage({pageToLoad: 1, append: false, query: q});
  }, [isShortQuery, q, fetchPage]);

  const loadMore = useCallback(() => {
    if (isShortQuery) return;
    if (!hasNext || initialLoading || loadingMore || refreshing) return;
    if (!canLoadMoreRef.current) return;
    canLoadMoreRef.current = false;
    fetchPage({pageToLoad: page + 1, append: true, query: q});
  }, [
    fetchPage,
    hasNext,
    initialLoading,
    loadingMore,
    refreshing,
    page,
    q,
    isShortQuery,
  ]);

  const onRefresh = useCallback(() => {
    if (isShortQuery) {
      setRefreshing(false);
      return;
    }
    if (initialLoading || loadingMore) return;
    setRefreshing(true);
    setTotalResults(null);
    fetchPage({pageToLoad: 1, append: false, query: q});
  }, [fetchPage, initialLoading, loadingMore, q, isShortQuery]);

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
                imageUrl={item.urlToImage}
                linkUrl={item.url}
                sourceName={item.source?.name}
                author={item.author}
                publishedAt={item.publishedAt}
              />
            )}
            contentContainerStyle={{padding: 16, flexGrow: 1}}
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
            ListEmptyComponent={
              !initialLoading ? (
                <View style={{padding: 24, alignItems: 'center'}}>
                  <Text style={{opacity: 0.7, textAlign: 'center'}}>
                    {isShortQuery
                      ? t('news.minSearch', {count: MIN_QUERY_CHARS})
                      : normalizedQuery
                      ? t('news.noResultsSearch', {query: normalizedQuery})
                      : t('news.emptyList')}
                  </Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
