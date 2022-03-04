import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import ProfileIcon from '../components/kit/avatar/ProfileIcon';
import {RCTheme} from '../style/theme';
import {withTheme, makeStyles} from 'react-native-elements';
import DWTView from '../components/kit/view/DWTView';
import {useForm, Controller} from 'react-hook-form';
import * as Container from '../container';
import {update} from '../api/auth';
import Text from '../components/kit/text/Text';
import {EditUserBody} from '../types/auth';
import {editProfile} from '../assets/data/formData';
import {Button, TextInput} from 'react-native-paper';
type Props = {
  theme?: RCTheme;
  route: any;
};

const MyProfile = (props: Props) => {
  const styles = useStyles(props);
  const {theme} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const {loggedInUser: user, saveLoggedInUser} =
    Container.Settings.useContainer();

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
  console.log('myprofile user', user);

  const onPressHandler = async (data: EditUserBody) => {
    console.log('edit user api is not ready');
    setLoading(true);
    if (user) {
      update({...data, id: user._id})
        .then(async res => {
          if (!res.error) {
            await saveLoggedInUser(res?.data.user);
            console.log('updated res', res);
            Snackbar.show({
              text: 'Profile has been updated successfully',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: props.theme?.colors?.primary,
              textColor: props.theme?.colors?.white,
            });
          } else {
            throw res;
          }
        })
        .catch(error => console.log('error in updating profile : ', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <DWTView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileIcon
          onPressIcon={() => null}
          iconName="camera"
          iconColor={theme.colors?.primary}
          hasBorder={true}
          item={user}
        />
        <View style={styles.textContainer}>
          <Text size="extraLarge" color="h1">
            {user?.name}
          </Text>
          <Text size="small" color="h3">
            {user?.email}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator
            color={props.theme?.colors?.primary}
            size="large"
          />
        ) : (
          <>
            {editProfile.map(field => (
              <Controller
                key={field.name}
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
                    theme={{
                      colors: {
                        primary: theme.colors.primary,
                        text: theme.colors.h1,
                        placeholder: theme.colors.h3,
                        background:
                          theme?.name === 'dark'
                            ? theme.colors.darkerBackground2
                            : theme.colors.grey0,
                      },
                    }}
                    style={styles.textinput}
                    onChangeText={onChange}
                  />
                )}
                defaultValue=""
              />
            ))}

            <Button
              theme={theme}
              mode="contained"
              style={styles.button}
              onPress={handleSubmit(onPressHandler)}>
              Save
            </Button>
          </>
        )}
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    inputContainer: {
      width: '100%',
      marginTop: 8,
      marginBottom: 16,
    },
    button: {
      marginVertical: 8,
      borderRadius: 8,
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(MyProfile, '');
