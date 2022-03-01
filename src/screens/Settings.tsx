import React, {useMemo, useState} from 'react';
import {makeStyles, withTheme} from 'react-native-elements';
import {
  ActivityIndicator,
  FlatList,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../components/kit/avatar/Avatar';
import Text from '../components/kit/text/Text';
import {fontSize, iconSize} from '../style/constants';
import SettingItem from '../components/settings/SettingItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RCTheme} from '../style/theme';
import {Settings as SettingsContainer} from '../container';
import DWTView from '../components/kit/view/DWTView';
import {useNavigation} from '@react-navigation/native';

type Props = {
  theme: RCTheme;
};
const Settings = (props: Props) => {
  const styles = useStyles();
  const {
    theme,
    saveTheme,
    loggedInUser,
    clearLoggedInUser,
    clearLoggedInUserToken,
  } = SettingsContainer.useContainer();
  const [isLoading, setLoading] = useState(false);
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const toggleSwitch = async () => {
    await saveTheme(isDarkMode ? 'light' : 'dark');
  };
  const logoutHandler = async () => {
    setLoading(true);
    await clearLoggedInUser();
    await clearLoggedInUserToken();
    setLoading(false);
  };
  const navigation = useNavigation();

  const data = [
    {
      id: 100,
      title: 'General',
      subData: [
        {
          id: 101,
          title: 'Dark Mode',
          icon: <Ionicons name="moon" style={styles.icon} />,
          rightContainer: (
            <Switch
              trackColor={{
                false: props.theme.colors.grey3,
                true: props.theme.colors.primary,
              }}
              thumbColor={
                isDarkMode
                  ? props.theme.colors.primaryDark
                  : props.theme.colors.white
              }
              ios_backgroundColor={props.theme.colors.grey3}
              onValueChange={toggleSwitch}
              value={isDarkMode}
            />
          ),
        },
        {
          id: 102,
          title: 'Language',
          icon: <Ionicons name="language" style={styles.icon} />,
          rightContainer: (
            <Text color="textPara" size="small">
              English (India)
            </Text>
          ),
        },
      ],
    },
    {
      id: 200,
      title: 'Specific',
      subData: [
        {
          id: 201,
          title: 'About',
          icon: <AntIcon name="profile" style={styles.icon} />,
        },
        {
          id: 202,
          title: 'Change Password',
          icon: <MCIcon name="lastpass" style={styles.icon} />,
          onPress: () => navigation.navigate('ChangePassword' as never),
        },
        {
          id: 202,
          title: isLoading ? (
            <ActivityIndicator color={props.theme.colors.white} />
          ) : (
            'Log Out'
          ),
          onPress: () => logoutHandler(),
          icon: <AntIcon name="logout" style={styles.icon} />,
        },
      ],
    },
  ];
  return (
    <DWTView style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        data={data}
        ListHeaderComponent={
          <>
            <Avatar size="large" source={{uri: 'https://picsum.photos/200'}} />
            <Text style={styles.versionText}>V.1.0.2</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyProfile' as never)}>
              <View style={styles.profileContainer}>
                <Avatar
                  size="normal"
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                  }}
                  containerStyle={styles.avatarContainer}
                />

                <View style={styles.userDetailsContainer}>
                  <Text size="normal" weight="bold">
                    {loggedInUser.name}
                  </Text>
                  <Text size="extraSmall" color="textPara">
                    edit, update profile
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        }
        renderItem={({item}) => <SettingItem item={item} />}
      />
    </DWTView>
  );
};

const useStyles = makeStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors?.background,
    },
    versionText: {
      textAlign: 'center',
      marginVertical: 16,
      fontSize: fontSize.small,
      color: theme.colors.textPara,
    },
    icon: {
      fontSize: iconSize.small,
      color: theme.colors.grey5,
    },

    //
    profileContainer: {
      backgroundColor: theme.colors.darkerBackground,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 4,
      marginHorizontal: 16,
      marginVertical: 6,
      flexDirection: 'row',
    },
    avatarContainer: {
      margin: 5,
    },
    userDetailsContainer: {
      justifyContent: 'space-evenly',
      margin: 8,
    },
  };
});

export default withTheme(Settings, '');