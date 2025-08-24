import React from 'react';
import {BaseFormikInput} from './BaseFormikInput';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

export default function FormikPhoneInput(props: BaseFormikInputProps) {
  return <BaseFormikInput keyboardType="phone-pad" {...props} />;
}
