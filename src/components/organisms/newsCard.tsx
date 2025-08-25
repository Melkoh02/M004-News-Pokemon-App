import React, {useMemo, useCallback} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {Card, Chip, IconButton, Text, useTheme} from 'react-native-paper';
import type {NewsCardProps} from '../../lib/types/newsCard';
import {timeAgo} from '../../lib/helpers/timeAgo.ts';
import {useTranslation} from 'react-i18next';

export default function NewsCard({
  title,
  description,
  imageUrl,
  linkUrl,
  sourceName,
  author,
  publishedAt,
}: NewsCardProps) {
  const theme = useTheme();
  const {t} = useTranslation();

  const ago = useMemo(() => timeAgo(publishedAt), [publishedAt]);
  const formattedDate = useMemo(
    () => (publishedAt ? new Date(publishedAt).toLocaleDateString() : ''),
    [publishedAt],
  );

  const share = useCallback(() => {
    const message = linkUrl ? `${title}\n${linkUrl}` : title;
    Share.share({message}).catch(() => {});
  }, [title, linkUrl]);

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Cover
        source={{uri: imageUrl || 'https://picsum.photos/900/600'}}
        style={styles.cover}
        resizeMode="cover"
      />

      <Card.Title
        title={title}
        titleNumberOfLines={3}
        titleStyle={styles.title}
        subtitle={
          <View style={styles.metaRow}>
            <Chip compact mode="flat" style={styles.sourceChip}>
              <Text numberOfLines={1} variant="labelMedium">
                {sourceName ?? 'Unknown source'}
              </Text>
            </Chip>
            {!!ago && (
              <>
                <Text
                  style={[styles.dot, {color: theme.colors.onSurfaceVariant}]}>
                  •
                </Text>
                <Text
                  style={[
                    styles.subtle,
                    {color: theme.colors.onSurfaceVariant},
                  ]}
                  numberOfLines={1}>
                  {ago}
                </Text>
              </>
            )}
            {!!formattedDate && (
              <>
                <Text
                  style={[styles.dot, {color: theme.colors.onSurfaceVariant}]}>
                  •
                </Text>
                <Text
                  style={[
                    styles.subtle,
                    {color: theme.colors.onSurfaceVariant},
                  ]}
                  numberOfLines={1}>
                  {formattedDate}
                </Text>
              </>
            )}
          </View>
        }
      />

      {!!description && (
        <Card.Content style={styles.content}>
          <Text variant="bodyMedium">{description}</Text>
        </Card.Content>
      )}

      <Card.Actions style={styles.actions}>
        <View style={styles.bylineWrap}>
          {!!author && (
            <Text
              variant="bodySmall"
              style={[styles.byline, {color: theme.colors.onSurfaceVariant}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`${t('common.by')} ${author}`}
            </Text>
          )}
        </View>

        {linkUrl ? (
          <IconButton
            icon="open-in-new"
            onPress={() => {
              import('react-native').then(({Linking}) =>
                Linking.openURL(linkUrl).catch(() => {}),
              );
            }}
            accessibilityLabel="Open article"
          />
        ) : null}
        <IconButton
          icon="share-variant"
          onPress={share}
          accessibilityLabel="Share article"
        />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cover: {height: 190},
  title: {fontSize: 20, fontWeight: '800', lineHeight: 26, paddingVertical: 12},
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 6,
    marginTop: 4,
  },
  sourceChip: {
    maxWidth: '70%',
    flexShrink: 1,
    minHeight: 26,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  dot: {marginTop: -1},
  subtle: {fontSize: 13},
  content: {paddingTop: 8},
  actions: {
    paddingRight: 4,
    paddingBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bylineWrap: {
    flex: 1,
    paddingLeft: 2,
    minWidth: 0,
  },
  byline: {
    marginTop: 2,
    flexShrink: 1,
  },
});
