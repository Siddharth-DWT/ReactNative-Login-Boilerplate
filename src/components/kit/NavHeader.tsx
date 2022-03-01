import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  View,
  BackHandler,
  NativeEventSubscription,
  TouchableWithoutFeedback,
} from 'react-native';
import {makeStyles, useTheme, withTheme} from 'react-native-elements';
import {IconNode} from 'react-native-elements/dist/icons/Icon';
import Icon from 'react-native-vector-icons/Entypo';
import {RCTheme} from '../../style/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatusBar from '../kit/StatusBar';
import {iconSize} from '../../style/constants';
import Text from './text/Text';

type Props = {
  theme?: RCTheme;
  onBackPress?: () => void;
  title: string;
  rightIcon?: IconNode;
  backgroundColor?: string;
  textColor?: string;
  hideBack?: boolean;
};

const NavHeader = (props: Props) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const defaultbackHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      props.onBackPress ? props.onBackPress() : defaultbackHandler();
      return true;
    };
    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [defaultbackHandler, props]);

  const styles = useStyles(props);
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <StatusBar />
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={props.onBackPress ?? defaultbackHandler}>
          <View style={styles.leftContainer}>
            {!props.hideBack && (
              <Icon
                name="chevron-left"
                size={iconSize.large}
                color={props.textColor ?? theme?.colors?.textHeading}
                style={styles.leftIcon}
              />
            )}
            <Text weight="bold" size="large">
              {props.title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightIconContainer}>{props.rightIcon}</View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: props.backgroundColor ?? theme.colors?.background,
    },
    leftContainer: {
      flex: 1,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {
      paddingHorizontal: 8,
    },
    rightIconContainer: {
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  };
});

export default withTheme(NavHeader, '');
