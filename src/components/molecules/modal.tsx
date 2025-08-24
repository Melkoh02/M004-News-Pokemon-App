import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Surface, Text} from 'react-native-paper';
import {BaseModalProps} from '../../lib/types/baseModal';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';

export default function BaseModal({
  isVisible = false,
  onDismiss,
  title,
  titleStyle,
  content,
  contentStyle,
  actions,
}: BaseModalProps) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <Surface style={styles.container} elevation={2}>
          <Text
            variant="titleLarge"
            style={{
              ...styles.title,
              color: theme.colors.primary,
              ...(titleStyle || {}),
            }}>
            {title}
          </Text>
          <View style={{...styles.content, ...(contentStyle || {})}}>
            {content}
          </View>
          <View style={styles.actions}>
            {actions &&
              actions.map(({text, onPress, mode = 'text', style}, index) => (
                <Button key={index} mode={mode} onPress={onPress} style={style}>
                  {text}
                </Button>
              ))}
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 32,
    borderRadius: 12,
  },
  container: {
    borderRadius: 12,
    padding: 24,
  },
  title: {
    marginBottom: 16,
  },
  content: {
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 8,
  },
});
