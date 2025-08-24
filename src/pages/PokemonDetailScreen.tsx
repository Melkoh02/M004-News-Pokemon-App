import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PokemonStackParamList} from '../lib/types/navigation.ts';

export default function PokemonDetailScreen() {
  const api = useApi();
  const {t} = useTranslation();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const {
    params: {id},
  } = useRoute<RouteProp<PokemonStackParamList, 'PokemonDetailScreen'>>();

  const getDetails = () => {
    setLoading(true);
    api.getPokemon(id).handle({
      onSuccess: res => {
        console.log(res);
        setData(res);
      },
      errorMessage: t('snackBarMessages.detailPokemonError'),
      onFinally: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Text>Hellooooo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
