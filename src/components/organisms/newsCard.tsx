import {StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {NewsCardProps} from '../../lib/types/newsCard.ts';

export default function NewsCard({title, description, url}: NewsCardProps) {
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
    margin: 8,
    marginBottom: 12,
  },
  titleContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 4,
  },
});
