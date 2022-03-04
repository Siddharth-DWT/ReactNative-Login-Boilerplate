import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {withTheme, makeStyles} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {DWTTheme} from '../style/theme';
import {loginFormData} from '../assets/data/formData';
import {getUserById, login} from '../api/auth';
import Settings from '../container/Settings';
import PopupContainer from './PopupContainer';
import Text from '../components/kit/text/Text';

type Props = {
  theme?: DWTTheme;
};

interface FormValues {
  email: string;
  password: string;
}

const LogIn = (props: Props) => {
  const {theme} = props;
  const navigation = useNavigation();
  const styles = useStyles();
  const [isLoading, setLoading] = useState<boolean>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      email: 'email',
      password: 'password',
    },
  });
  const {saveLoggedInUserToken, saveLoggedInUser} = Settings.useContainer();
  const loginHandler = async (data: any) => {
    setLoading(true);
    await login(data)
      .then(async res => {
        if (res.success && res.user && res.user.id) {
          await getUserById({id: res.user.id})
            .then(async res => {
              if (res.result) {
                await saveLoggedInUser(res.result);
              } else {
                console.log('error1', res);
              }
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {});

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
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <PopupContainer
      headerComponent={
        <Text color="white" size="jumboXPlus" weight="bold">
          Welcome!
        </Text>
      }
      popupComponent={
        <>
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
                    mode="flat"
                    left={
                      <TextInput.Icon
                        name={item.iconName}
                        color={theme.colors.primary}
                      />
                    }
                    style={styles.textinput}
                    onChangeText={onChange}
                    activeOutlineColor={theme.colors.primary}
                    outlineColor={theme.colors.primary}
                    underlineColor={theme.colors.primary}
                    selectionColor={theme.colors.primary}
                    activeUnderlineColor={theme.colors.primary}
                    placeholderTextColor={theme.colors.error}
                  />
                </>
              )}
            />
          ))}
          <TouchableOpacity>
            <Text
              style={styles.forgotPasswordText}
              onPress={() => navigation.navigate('ForgotPassword' as never)}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            {isLoading ? (
              <ActivityIndicator color={props.theme.colors.primary} />
            ) : (
              <>
                <Button
                  theme={theme}
                  mode="contained"
                  style={styles.button}
                  onPress={handleSubmit(loginHandler)}>
                  {`Log In`}
                </Button>
                <Button
                  theme={theme}
                  mode="text"
                  style={styles.button}
                  onPress={() => navigation.navigate('SignUp' as never)}>
                  {`Sign Up`}
                </Button>
              </>
            )}
          </View>
        </>
      }
    />
  );
};

const useStyles = makeStyles(() => {
  return {
    textinput: {
      marginVertical: 8,
    },
    forgotPasswordText: {
      marginVertical: 8,
      alignSelf: 'center',
    },
    button: {
      marginVertical: 4,
      borderRadius: 8,
    },
  };
});

export default withTheme(LogIn, '');
