import type {StyleProp, ViewStyle} from 'react-native';

export interface SelectInputOptionsProp {
  id: string;
  value: string;
}

export interface SelectInputProps {
  /** controlled selected id */
  value: string;
  /** called with new id (or '' to clear) */
  onChange: (id: string) => void;
  /** floating label text (always visible once focused or when value exists) */
  label?: string;
  /** placeholder text (only shows when there's no value and input isn’t focused) */
  placeholder?: string;
  /** list of all options */
  options: SelectInputOptionsProp[];
  /**
   * optional search-hook:
   * if provided, parent drives `options`
   * otherwise we filter `options` locally
   */
  onSearch?: (query: string) => void;
  /** whether to show the search bar (defaults to true) */
  showSearch?: boolean;
  /** style for the TextInput */
  style?: StyleProp<ViewStyle>;

  /** any other TextInput props (mode, dense, etc.) */
  [key: string]: any;
}
