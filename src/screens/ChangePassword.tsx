import React, {useState} from 'react';
import {ScrollView, ToastAndroid, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import {RCTheme} from '../style/theme';
import {changePassword as changePasswordData} from '../assets/data/formData';
import DWTView from '../components/kit/view/DWTView';
import Button from '../components/kit/button/DWTButton';
import Text from '../components/kit/text/Text';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {changePassword} from '../api/auth';
import Settings from '../container/Settings';

type Props = {
  theme?: RCTheme;
};

const ChangePassword = (props: Props) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {loggedInUser} = Settings.useContainer();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const changePasswordHandler = async (data: any) => {
    setLoading(true);
    await changePassword({...data, id: loggedInUser._id})
      .then(res => {
        if (res.success) {
          ToastAndroid.show(`Password has been changed successfully`, 100);
          console.log('res - change password : ', res);
          navigation.navigate('Home' as never);
        } else {
          ToastAndroid.show(`Unable to change password`, 100);
          console.log('error in changing password', res);
        }
      })
      .catch(error => {
        ToastAndroid.show(`Server Error`, 100);
        console.log('server error', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text} type="h2">
          Enter Details
        </Text>

        {changePasswordData.map(item => (
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
                mode="outlined"
                style={styles.textinput}
                theme={{colors: props.theme.colors}}
                onChangeText={onChange}
              />
            )}
          />
        ))}

        <Button
          containerStyle={[styles.button, {padding: 0}]}
          rounded
          onPress={handleSubmit(changePasswordHandler)}
          title={
            isLoading ? (
              <ActivityIndicator color={props.theme?.colors.white} />
            ) : (
              'Change Password'
            )
          }
        />
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
      paddingVertical: 4,
    },
    text: {
      padding: 8,
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(ChangePassword, '');
