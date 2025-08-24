import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import useApi from '../lib/hooks/useApi.ts';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import {getPokemonIdFromUrl} from '../lib/helpers/getPokemonId.ts';
import {capitalizeString} from '../lib/helpers/capitalizeString.ts';
import {buildPokemonImageUrl} from '../lib/helpers/buildPokemonImageUrl.ts';
import PokemonCard from '../components/organisms/pokemonCard.tsx';
import {Pokemon} from '../lib/types/pokemon.ts';
import {useNavigation} from '../lib/hooks/useNavigation.ts';

const PAGE_SIZE = 20;

export default function PokemonScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const api = useApi();
  const navigation = useNavigation('PokemonStack');

  const [data, setData] = useState<Pokemon[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // guard to avoid multiple onEndReached fires during momentum
  const canLoadMoreRef = useRef(true);

  // Fetch a specific page
  const fetchPage = useCallback(
    ({offset: off, append}: {offset: number; append: boolean}) => {
      append ? setLoadingMore(true) : setInitialLoading(true);

      // guard so that we don’t fetch if we’re in search mode
      if (searchQuery.trim()) {
        return;
      }

      api.listPokemon({limit: PAGE_SIZE, offset: off}).handle({
        onSuccess: res => {
          console.log('Api called!');
          const moreComing = Boolean(res.next);
          setHasNext(moreComing);

          setData(prev => (append ? [...prev, ...res.results] : res.results));
          setOffset(off + PAGE_SIZE); // advance for the next call
        },
        errorMessage: t('snackBarMessages.listPokemonError'),
        onFinally: () => {
          setInitialLoading(false);
          setLoadingMore(false);
          setRefreshing(false);
          canLoadMoreRef.current = true;
        },
      });
    },
    [api, t, searchQuery],
  );

  // initial load — runs once
  useEffect(() => {
    fetchPage({offset: 0, append: false});
  }, [fetchPage]);

  const onRefresh = useCallback(() => {
    if (initialLoading || loadingMore) return;
    setRefreshing(true);
    // reset back to first page
    fetchPage({offset: 0, append: false});
  }, [fetchPage, initialLoading, loadingMore]);

  const loadMore = useCallback(() => {
    if (!hasNext || initialLoading || loadingMore || refreshing) return;
    if (!canLoadMoreRef.current) return;
    canLoadMoreRef.current = false;
    fetchPage({offset, append: true});
  }, [fetchPage, hasNext, initialLoading, loadingMore, refreshing, offset]);

  const pokemons = useMemo(() => {
    return data.map(p => {
      const id = getPokemonIdFromUrl(p.url);
      return {
        title: capitalizeString(p.name),
        description: `Pokédex #${id ?? '—'}`,
        url: buildPokemonImageUrl(id),
        id: id,
      };
    });
  }, [data]);

  // Filter only the currently loaded dataset (client-side)
  const visiblePokemons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter(p => p.title.toLowerCase().includes(q));
  }, [pokemons, searchQuery]);

  return (
    <>
      {/*pokeAPI does not support any kind of search! so search implementation is limited to current data*/}
      <MainSearchBar
        placeholder={t('pokemon.searchBarPlaceHolder')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}>
        {initialLoading && data.length === 0 && !searchQuery ? (
          <ActivityIndicator size={25} style={{paddingTop: 20}} />
        ) : (
          <FlatList
            data={visiblePokemons}
            numColumns={2}
            keyExtractor={(item, index) => String(item.id ?? index)}
            renderItem={({item}) => (
              <PokemonCard
                id={item.id}
                title={item.title}
                description={item.description}
                url={item.url ?? null}
                onPress={() => {
                  if (item.id != null) {
                    navigation.navigate('PokemonDetailScreen', {id: item.id});
                  }
                }}
              />
            )}
            contentContainerStyle={{padding: 16}}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              canLoadMoreRef.current = true;
            }}
            ListFooterComponent={
              loadingMore && !searchQuery ? (
                <ActivityIndicator size={20} style={{paddingVertical: 16}} />
              ) : null
            }
            refreshing={refreshing && !searchQuery}
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
