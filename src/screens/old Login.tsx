import React, {useEffect, useState} from 'react';
import {ScrollView, View, ToastAndroid, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import {RCTheme} from '../style/theme';
import {loginFormData} from '../assets/data/formData';
import DWTView from '../components/kit/view/DWTView';
import Button from '../components/kit/button/DWTButton';
import Text from '../components/kit/text/Text';
import {useForm, Controller} from 'react-hook-form';
import {login} from '../api/auth';
import Settings from '../container/Settings';

type Props = {
  theme?: RCTheme;
};
const LogIn = (props: Props) => {
  const {saveLoggedInUserToken, saveLoggedInUser} = Settings.useContainer();
  const [isLoading, setLoading] = useState<boolean>();
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'email',
      password: 'password',
    },
  });

  const loginHandler = async (data: any) => {
    setLoading(true);
    await login(data)
      .then(async res => {
        if (res.success && res.user) {
          await saveLoggedInUser(res.user);
          await saveLoggedInUserToken(res.user.token);
          ToastAndroid.show(`Login Successful`, 100);
          console.log('success', res);
        } else {
          ToastAndroid.show(`Login Failed`, 100);
          console.log('error in login', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Please Log In </Text>

        {loginFormData.map(item => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <>
                <TextInput
                  label={item.title}
                  mode="outlined"
                  style={styles.textinput}
                  theme={{colors: props.theme.colors}}
                  onChangeText={onChange}
                />
              </>
            )}
          />
        ))}
        <Text style={styles.forgotAcText}>
          Forgot Password ?
          <Text
            color="link"
            onPress={() => navigation.navigate('ForgotPassword' as never)}>
            {' Click Here '}
          </Text>
          to reset
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            containerStyle={[styles.button, {padding: 0}]}
            type="clear"
            rounded
            onPress={() => navigation.navigate('SignUp' as never)}
            title="Sign Up"
          />
          <Button
            title={
              isLoading ? (
                <ActivityIndicator color={props.theme.colors.white} />
              ) : (
                'Log In'
              )
            }
            containerStyle={styles.button}
            rounded
            onPress={handleSubmit(loginHandler)}
          />
        </View>
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      marginHorizontal: 16,
      marginTop: 8,
    },
    button: {
      width: '45%',
      paddingVertical: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: fontSize.normal,
      padding: 8,
    },
    forgotAcText: {
      textAlign: 'center',
      fontSize: fontSize.normal,
      marginVertical: 16,
      color: theme.colors.textSubHeading,
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(LogIn, '');
