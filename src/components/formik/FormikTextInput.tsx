import React from 'react';
import {BaseFormikInput} from './BaseFormikInput';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

export default function FormikTextInput(props: BaseFormikInputProps) {
  return <BaseFormikInput {...props} />;
}
