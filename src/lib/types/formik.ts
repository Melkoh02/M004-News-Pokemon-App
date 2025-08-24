import type {
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
  FormikProps,
} from 'formik';
import type {TextInputProps} from 'react-native-paper';
import {SelectInputOptionsProp} from './selectInput.ts';

export type BaseFormikInputProps = {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  form: FormikProps<any>;
} & Omit<TextInputProps, 'value' | 'onChangeText'> & {label: string};

export interface FormikSelectInputProps
  extends FieldProps,
    Pick<BaseFormikInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  options: SelectInputOptionsProp[];
  defaultValue?: string;
  onSearch?: (query: string) => void;
}
