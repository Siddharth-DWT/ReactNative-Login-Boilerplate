import React, {useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import Button from '../components/kit/button/DWTButton';
import {RCTheme} from '../style/theme';
import Settings from '../container/Settings';
import {useNavigation} from '@react-navigation/native';

type Props = {
  theme?: RCTheme;
};
const Home = (props: Props) => {
  const styles = useStyles();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {clearLoggedInUser, clearLoggedInUserToken} = Settings.useContainer();

  const logoutHandler = async () => {
    setLoading(true);
    await clearLoggedInUser();
    await clearLoggedInUserToken();
    setLoading(false);
  };
  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Home </Text>
        <Button
          title="Change Password"
          containerStyle={styles.button}
          rounded
          onPress={() => navigation.navigate('ChangePassword' as never)}
        />
        <Button
          title={
            isLoading ? (
              <ActivityIndicator color={props.theme.colors.white} />
            ) : (
              'Log Out'
            )
          }
          containerStyle={styles.button}
          rounded
          onPress={logoutHandler}
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
    text: {
      fontSize: fontSize.normal,
      padding: 8,
    },
    button: {
      paddingVertical: 4,
    },
  };
});

export default withTheme(Home, '');
