import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {PokemonCardProps} from '../../lib/types/pokemonCard.ts';

export default function PokemonCard({
  title,
  description,
  url,
}: PokemonCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{uri: url ? url : 'https://picsum.photos/700'}} />
      <Card.Title
        title={title}
        style={styles.titleContainer}
        titleStyle={styles.title}
        titleNumberOfLines={3}
      />
      {description && (
        <Card.Content style={styles.descriptionContainer}>
          <Text>{description}</Text>
        </Card.Content>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    minWidth: '45%',
  },
  titleContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 4,
  },
});
