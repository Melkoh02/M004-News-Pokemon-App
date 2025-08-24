import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Appbar,
  Card,
  Chip,
  Divider,
  List,
  ProgressBar,
  Text,
  useTheme,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import useApi from '../lib/hooks/useApi';
import {PokemonStackParamList} from '../lib/types/navigation';
import {buildPokemonImageUrl} from '../lib/helpers/buildPokemonImageUrl.ts';
import {capitalizeString} from '../lib/helpers/capitalizeString.ts';
import {prettyStat} from '../lib/helpers/pokemonPrettyStat.ts';

type PokeResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {slot: number; type: {name: string}}[];
  abilities: {ability: {name: string}; is_hidden: boolean}[];
  stats: {base_stat: number; stat: {name: string}}[];
};

export default function PokemonDetailScreen() {
  const api = useApi();
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PokeResponse | null>(null);

  const {
    params: {id},
  } = useRoute<RouteProp<PokemonStackParamList, 'PokemonDetailScreen'>>();

  useEffect(() => {
    setLoading(true);
    api.getPokemon(id).handle({
      onSuccess: (res: PokeResponse) => setData(res),
      errorMessage: t('snackBarMessages.detailPokemonError'),
      onFinally: () => setLoading(false),
    });
  }, [id]);

  const title = useMemo(
    () => (data?.name ? capitalizeString(data.name) : t('common.loading')),
    [data, t],
  );

  const imageUri = buildPokemonImageUrl(id);

  // normalize stat to 0..1 for ProgressBar (max 255 so that the scale is absolute across species)
  const statPct = (n: number) => Math.min(n / 255, 1);

  if (loading || !data) {
    return (
      <View style={[styles.center, {backgroundColor: theme.colors.background}]}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header mode="small" statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollPad}>
        {/* Hero */}
        <Card mode="elevated" style={styles.heroCard}>
          <Card.Cover
            source={{uri: imageUri}}
            style={styles.heroImage}
            resizeMode="contain"
            theme={{roundness: 24}}
          />
          <Card.Content>
            <View style={styles.rowWrap}>
              {data.types
                ?.sort((a, b) => a.slot - b.slot)
                .map(({type}) => (
                  <Chip key={type.name} style={styles.chip} icon="tag">
                    {capitalizeString(type.name)}
                  </Chip>
                ))}
            </View>
          </Card.Content>
        </Card>

        {/* Quick facts */}
        <View style={styles.factsRow}>
          <FactCard
            label={t('pokemon.baseExperience')}
            value={String(data.base_experience)}
          />
          <FactCard
            label={t('pokemon.height')}
            value={`${(data.height ?? 0) / 10} m`}
          />
          <FactCard
            label={t('pokemon.weight')}
            value={`${(data.weight ?? 0) / 10} kg`}
          />
        </View>

        {/* Abilities */}
        <List.Section>
          <List.Subheader>{t('pokemon.abilities')}</List.Subheader>
          <View style={styles.rowWrap}>
            {data.abilities?.map(({ability, is_hidden}) => (
              <Chip
                key={ability.name}
                mode="outlined"
                style={styles.chip}
                icon={is_hidden ? 'eye-off' : 'flash'}>
                {capitalizeString(ability.name)}
                {is_hidden ? ' • Hidden' : ''}
              </Chip>
            ))}
          </View>
        </List.Section>

        <Divider style={styles.divider} />

        {/* Stats */}
        <List.Section>
          <List.Subheader>{t('pokemon.stats')}</List.Subheader>
          {data.stats?.map(s => (
            <View key={s.stat.name} style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text variant="titleSmall">{prettyStat(s.stat.name)}</Text>
                <Text variant="labelLarge">{s.base_stat}</Text>
              </View>
              <ProgressBar
                progress={statPct(s.base_stat)}
                style={styles.progress}
              />
            </View>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}

const FactCard = ({label, value}: {label: string; value: string}) => (
  <Card mode="contained" style={styles.factCard}>
    <Card.Content>
      <Text variant="labelMedium" style={{opacity: 0.7}}>
        {label}
      </Text>
      <Text variant="titleLarge">{value}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  scrollPad: {padding: 16},
  heroCard: {borderRadius: 24, overflow: 'hidden', marginBottom: 16},
  heroImage: {height: 220, backgroundColor: 'transparent'},
  rowWrap: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12},
  chip: {marginRight: 6, marginBottom: 6},
  factsRow: {flexDirection: 'row', gap: 12, marginVertical: 8},
  factCard: {flex: 1, borderRadius: 16},
  divider: {marginVertical: 12},
  statRow: {marginBottom: 12},
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progress: {height: 10, borderRadius: 8},
});
