import React, {useEffect} from 'react';
import {FormikSelectInputProps} from '../../lib/types/formik.ts';
import SelectInput from '../molecules/selectInput.tsx';

export default function FormikSelectInput(props: FormikSelectInputProps) {
  const {
    field,
    form,
    options,
    label,
    placeholder,
    defaultValue,
    onSearch,
    style,
    ...rest
  } = props;

  // seed the initial value if provided
  useEffect(() => {
    if (defaultValue != null && !field.value) {
      form.setFieldValue(field.name, defaultValue);
    }
  }, []);

  return (
    <SelectInput
      value={field.value}
      onChange={val => {
        form.setFieldValue(field.name, val);
        form.setFieldTouched(field.name, true);
      }}
      label={label}
      placeholder={placeholder}
      options={options}
      onSearch={onSearch}
      style={style}
      {...rest}
    />
  );
}
