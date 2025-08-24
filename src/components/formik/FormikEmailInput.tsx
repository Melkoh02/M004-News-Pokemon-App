import React from 'react';
import {BaseFormikInput} from './BaseFormikInput';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

export default function FormikEmailInput(props: BaseFormikInputProps) {
  return (
    <BaseFormikInput
      keyboardType="email-address"
      autoCapitalize="none"
      {...props}
    />
  );
}
