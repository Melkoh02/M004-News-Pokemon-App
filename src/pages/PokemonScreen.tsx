import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import NewsCard from '../components/organisms/newsCard.tsx';
import {getPokemonIdFromUrl} from '../lib/helpers/getPokemonId.ts';
import {capitalizeString} from '../lib/helpers/capitalizeString.ts';
import {buildPokemonImageUrl} from '../lib/helpers/buildPokemonImageUrl.ts';

export default function PokemonScreen() {
  const theme = useTheme();
  const {t} = useTranslation();

  const useDummyData = () => {
    return useMemo(
      () => [
        {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
        {name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
        {name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'},
        {name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/'},
        {name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/'},
        {name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/'},
        {name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'},
        {name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/'},
        {name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/'},
        {name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/'},
        {name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/'},
        {name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/'},
        {name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/'},
        {name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/'},
        {name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/'},
        {name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/'},
        {name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/'},
        {name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/'},
        {name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/'},
        {name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/'},
      ],
      [],
    );
  };

  const listPayload = useDummyData();

  const pokemons = useMemo(() => {
    return listPayload.map(p => {
      const id = getPokemonIdFromUrl(p.url);
      return {
        title: capitalizeString(p.name),
        description: `Pokédex #${id ?? '—'}`,
        url: buildPokemonImageUrl(id),
        _id: id,
      };
    });
  }, [listPayload]);

  return (
    <>
      <MainSearchBar />
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}>
        <FlatList
          data={pokemons}
          keyExtractor={(item, index) => String(item._id ?? index)}
          renderItem={({item}) => (
            <NewsCard
              title={item.title}
              description={item.description}
              url={item.url ?? null}
            />
          )}
          contentContainerStyle={{padding: 16}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
