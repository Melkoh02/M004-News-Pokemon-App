import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useTranslation} from 'react-i18next';
import useApi from '../lib/hooks/useApi.ts';
import {Field, FormikProvider, useFormik} from 'formik';
import * as Yup from 'yup';
import FormikEmailInput from '../components/formik/FormikEmailInput.tsx';
import FormikPasswordInput from '../components/formik/FormikPasswordInput.tsx';
import {Button, Text} from 'react-native-paper';
import {useStore} from '../lib/hooks/useStore.ts';
import {useNavigation} from '../lib/hooks/useNavigation.ts';

export default function LoginScreen() {
  const theme = useTheme();
  const {t} = useTranslation();
  const api = useApi();
  const rootStore = useStore();
  const navigation = useNavigation('AuthStack');
  const [loading, setLoading] = React.useState(false);

  const login = (data: {email: string; password: string}) => {
    setLoading(true);
    api.login(data).handle({
      onSuccess: res => {
        console.log('res ===>', res);
        rootStore.userStore.setAuth(res);
      },
      successMessage: t('snackBarMessages.loginSuccess'),
      errorMessage: t('snackBarMessages.loginError'),
      onFinally: () => setLoading(false),
    });
  };

  const initialValues = {
    email: 'admin@admin.com',
    password: 'admin',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
  });

  const onLoginPress = () => {
    login(formik.values);
    Keyboard.dismiss();
  };

  const onContinuePress = () => {
    // quick and dirty guest implementation, for demo only, a more robust
    // implementation is needed for prod.
    const guestData = {
      access: 'guest',
      refresh: 'guest',
      user: {
        id: 1,
        email: 'guest',
        username: 'guest',
        name: 'guest',
        description: 'guest',
        birth_date: '1990-01-01',
        is_active: true,
      },
    };
    rootStore.userStore.setAuth(guestData);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onLoginPress,
  });

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
      <Text variant="headlineLarge" style={styles.title}>
        {t('login.title')}
      </Text>
      <FormikProvider value={formik}>
        <View style={styles.fields}>
          <Field
            component={FormikEmailInput}
            name="email"
            label={t('login.email')}
            placeholder={t('login.emailPlaceholder')}
          />
          <Field
            component={FormikPasswordInput}
            name="password"
            label={t('login.password')}
            placeholder={t('login.passwordPlaceholder')}
          />
          <View style={styles.actionsRow}>
            <Button
              mode="contained"
              onPress={onLoginPress}
              loading={loading}
              disabled={loading}
              style={[styles.button, styles.halfButton]}
              contentStyle={styles.buttonContent}>
              {!loading && t('login.loginButton')}
            </Button>
            <Button
              mode="contained"
              onPress={onContinuePress}
              style={[styles.button, styles.halfButton, styles.rightButton]}
              contentStyle={styles.buttonContent}>
              {t('login.continueAsGuest')}
            </Button>
          </View>
        </View>
        <Button
          mode="text"
          style={{paddingTop: 12}}
          onPress={() => navigation.navigate('ForgotPassword')}>
          {t('login.forgotPassword')}
        </Button>
        <View style={styles.footer}>
          <Text style={{color: theme.colors.onBackground}}>
            {t('login.noAccount')}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('SignUp')}
            style={{}}>
            {t('signUp.title')}
          </Button>
        </View>
      </FormikProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: '50%',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 24,
  },
  halfButton: {
    flex: 1,
  },
  rightButton: {
    marginLeft: 12,
  },
  buttonContent: {
    height: 48,
  },
  title: {
    fontWeight: '700',
    marginBottom: 32,
  },
  fields: {
    gap: 20,
  },
  button: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
