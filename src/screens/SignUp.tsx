import React, {useState} from 'react';
import {ScrollView, ToastAndroid, View, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import {RCTheme} from '../style/theme';
import {signupFormData} from '../assets/data/formData';
import DWTView from '../components/kit/view/DWTView';
import Button from '../components/kit/button/DWTButton';
import Text from '../components/kit/text/Text';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {create} from '../api/auth';

type Props = {
  theme?: RCTheme;
};
const SignUp = (props: Props) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const signupHandler = async (data: any) => {
    setLoading(true);
    await create(data)
      .then(res => {
        if (res) {
          ToastAndroid.show(`SignUp Successful`, 100);
          console.log('success', res);
        } else {
          ToastAndroid.show(`SignUp Failed`, 100);
          console.log('error in signup', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => {
        setLoading(false);
        navigation.navigate('LogIn' as never);
      });
  };
  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Enter Details</Text>

        {signupFormData.map(item => (
          <Controller
            key={item.id}
            name={item.name}
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange}}) => (
              <TextInput
                label={item.title}
                mode="flat"
                style={styles.textinput}
                theme={props.theme}
                onChangeText={onChange}
              />
            )}
          />
        ))}
        <Text style={styles.forgotAcText}>
          Already have an account ?
          <Text
            color="link"
            onPress={() => navigation.navigate('LogIn' as never)}>
            {' Log In '}
          </Text>
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            containerStyle={[styles.button, {padding: 0}]}
            rounded
            onPress={handleSubmit(signupHandler)}
            title={
              isLoading ? (
                <ActivityIndicator color={props.theme?.colors.white} />
              ) : (
                'Sign Up'
              )
            }
          />
        </View>
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    button: {
      paddingVertical: 4,
      marginBottom: 32,
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

export default withTheme(SignUp, '');
