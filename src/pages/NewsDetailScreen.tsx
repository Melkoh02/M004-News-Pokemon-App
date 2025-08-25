import React, {useCallback, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Chip,
  Divider,
  Text,
  useTheme,
} from 'react-native-paper';
import {Linking, Share} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NewsStackParamList} from '../lib/types/navigation.ts';

type DetailRoute = RouteProp<NewsStackParamList, 'NewsDetailScreen'>;

export default function NewsDetailScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const {params} = useRoute<DetailRoute>();
  const article = params?.article;

  const formattedDate = useMemo(() => {
    if (!article?.publishedAt) return undefined;
    try {
      return new Date(article.publishedAt).toLocaleString();
    } catch {
      return article.publishedAt;
    }
  }, [article?.publishedAt]);

  const openLink = useCallback(() => {
    if (article?.url) Linking.openURL(article.url);
  }, [article?.url]);

  const shareLink = useCallback(async () => {
    if (!article?.url) return;
    await Share.share({
      title: article.title ?? 'News',
      message: `${article.title ?? ''} ${article.url}`.trim(),
    });
  }, [article?.title, article?.url]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Appbar.Header mode="small" statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={article?.source?.name ?? 'News'} />
        {article?.url ? (
          <Appbar.Action icon="share-variant" onPress={shareLink} />
        ) : null}
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {article?.urlToImage ? (
          <Card mode="contained">
            <Card.Cover source={{uri: article.urlToImage}} />
          </Card>
        ) : null}

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.title}>
            {article?.title ?? 'Untitled'}
          </Text>

          <View style={styles.metaRow}>
            {article?.source?.name ? (
              <Chip compact style={styles.chip} icon="newspaper-variant">
                {article.source.name}
              </Chip>
            ) : null}
            {formattedDate ? (
              <Chip compact style={styles.chip} icon="calendar">
                {formattedDate}
              </Chip>
            ) : null}
          </View>

          {article?.author ? (
            <Text variant="labelLarge" style={styles.author}>
              {article.author}
            </Text>
          ) : null}
        </View>

        <Divider style={styles.divider} />

        {article?.description ? (
          <Text variant="bodyLarge" style={styles.paragraph}>
            {article.description}
          </Text>
        ) : null}

        {article?.content ? (
          <Text variant="bodyMedium" style={styles.paragraph}>
            {article.content}
          </Text>
        ) : null}

        <View style={styles.actions}>
          {article?.url ? (
            <Button mode="contained" onPress={openLink} icon="open-in-new">
              Open source
            </Button>
          ) : null}
        </View>

        <View style={{height: 32}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 16},
  section: {marginTop: 12},
  title: {marginTop: 8},
  metaRow: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 10},
  chip: {marginRight: 8, marginBottom: 8},
  author: {opacity: 0.7, marginTop: 6},
  divider: {marginVertical: 16},
  paragraph: {marginBottom: 12, lineHeight: 22},
  actions: {marginTop: 8, flexDirection: 'row', gap: 12},
});
