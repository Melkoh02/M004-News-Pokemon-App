import React from 'react';
import {TextInput} from 'react-native-paper';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';
import {useTheme} from '../../lib/hooks/useAppTheme.ts';

export function BaseFormikInput({
  field,
  form,
  meta,
  style,
  ...rest
}: BaseFormikInputProps) {
  const theme = useTheme();

  return (
    <>
      <TextInput
        {...rest}
        value={field.value}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        style={[
          {backgroundColor: theme.colors.surface, paddingHorizontal: 0},
          style,
        ]}
      />
    </>
  );
}
