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
import Button from '../components/kit/button/DWTButton';
import Text from '../components/kit/text/Text';
import {TextInput} from 'react-native-paper';
import {EditUserBody} from '../types/auth';

type Props = {
  theme?: RCTheme;
  route: any;
};

const inputs = [
  {name: 'name', title: 'Name', required: false},
  {name: 'email', title: 'Email', required: false},
  {name: 'gender', title: 'Gender', required: false},
  {name: 'phone', title: 'Phone', required: false},
];

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

  const onPressHandler = async (data: EditUserBody) => {
    console.log('edit user api is not ready');
    console.log(data);
    setLoading(true);
    if (user) {
      update({...data, id: user._id})
        .then(async res => {
          if (res) {
            // await saveLoggedInUser(res?.data.user);
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <DWTView style={styles.container}>
        <ProfileIcon
          onPressIcon={() => null}
          iconName="camera"
          iconColor={theme.colors?.primary}
          hasBorder={true}
          item={user}
        />
        <View style={styles.textContainer}>
          <Text size="extraLarge" color="textHeading">
            {`${user?.name}`}
          </Text>
          <Text size="normal" color="textPara">
            {`0${user?.phone}`}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator
            color={props.theme?.colors?.primary}
            size="large"
          />
        ) : (
          <>
            {inputs.map(item => (
              <Controller
                key={item.name}
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
                defaultValue="jamin"
              />
            ))}
            <Button
              title="Save"
              rounded={true}
              shadow={true}
              onPress={handleSubmit(onPressHandler)}
              containerStyle={styles.button}
            />
          </>
        )}
      </DWTView>
    </ScrollView>
  );
};

const useStyles = makeStyles(() => {
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
    },
    textinput: {
      marginVertical: 8,
    },
  };
});

export default withTheme(MyProfile, '');
