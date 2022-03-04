import React from 'react';
import {ScrollView, View} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {DWTTheme} from '../style/theme';
import fakeUserData from '../assets/data/fakeUserData';

type Props = {
  theme?: DWTTheme;
};

const AdminHome = (props: Props) => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <DWTView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={styles.text} type="h3">
          {`AdminHome`}
        </Text>
        <Text style={styles.text} type="h2">
          {`User Type : user`}
        </Text>

        {fakeUserData.map(user => {
          return (
            <View key={user._id} style={styles.userItemContainer}>
              <View style={styles.nameContainer}>
                <Text size="normal" color="h2">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </Text>
                <Text size="small" color="h5">
                  {user.email}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  theme={props.theme}
                  compact
                  labelStyle={styles.editButtonLabel}
                  style={styles.buttonStyle}
                  onPress={() =>
                    navigation.navigate(
                      'EditUserProfile' as never,
                      {user: user} as never,
                    )
                  }>
                  Edit
                </Button>
                <Button
                  theme={props.theme}
                  mode="contained"
                  compact
                  style={styles.buttonStyle}
                  onPress={() => navigation.navigate('DeleteModal' as never)}>
                  Delete
                </Button>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    text: {
      padding: 8,
    },
    userItemContainer: {
      backgroundColor: theme.colors.darkerBackground,
      marginVertical: 4,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    nameContainer: {
      flex: 1,
      alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'flex-end',
    },
    buttonStyle: {
      marginHorizontal: 4,
    },
    editButtonLabel: {
      color: theme.colors.primary,
    },
  };
});

export default withTheme(AdminHome, '');
