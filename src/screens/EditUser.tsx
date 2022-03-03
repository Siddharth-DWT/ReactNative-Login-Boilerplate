import React from 'react';
import {ScrollView} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import DWTView from '../components/kit/view/DWTView';
import {RCTheme} from '../style/theme';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {editProfile} from '../assets/data/formData';
import {TextInput} from 'react-native-paper';
import Button from '../components/kit/button/DWTButton';
import {EditUserBody, User} from '../types/auth';

type Props = {
  theme?: RCTheme;
  user?: User;
};

const EditUser = (props: Props) => {
  const styles = useStyles();
  const {user} = props;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      gender: user?.gender,
    },
  });

  const onPressHandler = async (data: EditUserBody) => {
    console.log('edit user api is not ready');
    // setLoading(true);
    // if (user) {
    //   update({...data, id: user._id})
    //     .then(async res => {
    //       if (!res.error) {
    //         await saveLoggedInUser(res?.data.user);
    //         console.log('updated res', res);
    //         Snackbar.show({
    //           text: 'Profile has been updated successfully',
    //           duration: Snackbar.LENGTH_SHORT,
    //           backgroundColor: props.theme?.colors?.primary,
    //           textColor: props.theme?.colors?.white,
    //         });
    //       } else {
    //         throw res;
    //       }
    //     })
    //     .catch(error => console.log('error in updating profile : ', error))
    //     .finally(() => setLoading(false));
  };

  return (
    <DWTView>
      <ScrollView style={styles.container}>
        {editProfile.map(field => (
          <Controller
            key={field.id}
            name={field.name}
            control={control}
            rules={{
              required: field.required,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                label={field.title}
                mode="flat"
                value={value}
                style={styles.textinput}
                theme={props.theme}
                onChangeText={onChange}
              />
            )}
            defaultValue=""
          />
        ))}
        <Button
          title="Save"
          rounded={true}
          shadow={true}
          // onPress={handleSubmit(onPressHandler)}
          onPress={handleSubmit(onPressHandler)}
          containerStyle={styles.button}
        />
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      marginHorizontal: 16,
      marginTop: 8,
    },

    textinput: {
      marginVertical: 8,
    },
    button: {
      marginVertical: 8,
    },
  };
});

export default withTheme(EditUser, '');
