import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import {List, Modal, Portal, Searchbar, TextInput} from 'react-native-paper';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {SelectInputProps} from '../../lib/types/selectInput.ts';

export default function SelectInput({
  value,
  onChange,
  label,
  placeholder,
  options,
  onSearch,
  showSearch = true,
  style,
  ...rest
}: SelectInputProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const filteredOptions = useMemo(() => {
    if (!showSearch) return options;
    if (onSearch) return options;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter(o => o.value.toLowerCase().includes(q));
  }, [options, searchQuery, onSearch]);

  const selectedOption = options.find(o => o.id === value);
  const displayValue = selectedOption ? selectedOption.value : '';

  return (
    <>
      <Pressable onPress={showModal}>
        <TextInput
          {...rest}
          // floating label
          label={label}
          // simple placeholder
          placeholder={placeholder}
          value={displayValue}
          editable={false}
          style={[
            {backgroundColor: theme.colors.surface, paddingHorizontal: 0},
            style,
          ]}
          right={
            <TextInput.Icon
              icon={value ? 'close' : visible ? 'menu-up' : 'menu-down'}
              onPress={() => {
                if (value) {
                  onChange('');
                } else {
                  visible ? hideModal() : showModal();
                }
              }}
            />
          }
        />
      </Pressable>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modal,
            {backgroundColor: theme.colors.surface},
          ]}>
          {showSearch && (
            <Searchbar
              placeholder="Search…"
              onChangeText={handleSearchChange}
              value={searchQuery}
              style={styles.search}
            />
          )}
          <ScrollView>
            {filteredOptions.map(opt => (
              <List.Item
                key={opt.id}
                title={opt.value}
                onPress={() => {
                  onChange(opt.id);
                  hideModal();
                }}
              />
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    padding: 10,
    borderRadius: 16,
  } as ViewStyle,
  search: {
    marginBottom: 10,
  },
});
