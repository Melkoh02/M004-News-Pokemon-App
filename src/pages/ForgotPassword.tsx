import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import {Field, FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import FormikEmailInput from '../components/formik/FormikEmailInput.tsx';
import {Button, IconButton, Text} from 'react-native-paper';
import {useNavigation} from '../lib/hooks/useNavigation.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ForgotPassword() {
  const theme = useTheme();
  const {t} = useTranslation();
  const api = useApi();
  const navigation = useNavigation('AuthStack');
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState(false);

  const forgotPassword = (data: {email: string}) => {
    setLoading(true);
    api.forgotPassword(data).handle({
      onSuccess: res => {
        console.log('Reset Link Sent', res);
      },
      onError: err => {
        console.log('Server replied with an error:', err.response);
      },
      onFinally: () => setLoading(false),
    });
  };

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is a required field'),
  });

  const onSubmitPress = () => {
    forgotPassword(formik.values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmitPress,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}>
        <IconButton
          icon="arrow-left"
          size={28}
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: insets.top, left: 8}}
        />
        <Text variant="headlineLarge" style={styles.title}>
          {t('forgotPassword.title')}
        </Text>
        <FormikProvider value={formik}>
          <View style={styles.fields}>
            <Field
              component={FormikEmailInput}
              name="email"
              label={t('forgotPassword.email')}
              placeholder={t('forgotPassword.email')}
            />
            <Button
              mode="contained"
              onPress={onSubmitPress}
              loading={loading}
              style={styles.button}>
              {!loading && t('forgotPassword.submitButton')}
            </Button>
          </View>
          <View style={styles.footer}>
            <Button mode="text" onPress={() => navigation.goBack()} style={{}}>
              {t('forgotPassword.backToLogin')}
            </Button>
          </View>
        </FormikProvider>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: '70%',
  },
  title: {
    fontWeight: '700',
    marginBottom: 32,
  },
  fields: {
    gap: 20,
  },
  button: {
    marginVertical: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
