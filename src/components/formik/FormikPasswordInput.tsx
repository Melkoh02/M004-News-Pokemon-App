import React from 'react';
import {BaseFormikInput} from './BaseFormikInput';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

export default function FormikPasswordInput(props: BaseFormikInputProps) {
  return <BaseFormikInput secureTextEntry {...props} />;
}
