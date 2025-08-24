import React, {useEffect, useMemo, useState} from 'react';
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

export default function PokemonScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const listPokemon = () => {
    setLoading(true);
    api.listPokemon().handle({
      onSuccess: res => {
        setData(res.results);
      },
      errorMessage: t('snackBarMessages.listPokemonError'),
      onFinally: () => setLoading(false),
    });
  };

  const pokemons = useMemo(() => {
    return data.map(p => {
      const id = getPokemonIdFromUrl(p.url);
      return {
        title: capitalizeString(p.name),
        description: `Pokédex #${id ?? '—'}`,
        url: buildPokemonImageUrl(id),
        _id: id,
      };
    });
  }, [data]);

  useEffect(() => {
    listPokemon();
  }, []);

  return (
    <>
      <MainSearchBar />
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}>
        {data.length > 0 ? (
          <FlatList
            data={pokemons}
            numColumns={2}
            keyExtractor={(item, index) => String(item._id ?? index)}
            renderItem={({item}) => (
              <PokemonCard
                title={item.title}
                description={item.description}
                url={item.url ?? null}
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
  container: {flex: 1},
});
