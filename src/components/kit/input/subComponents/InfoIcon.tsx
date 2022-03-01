import React from 'react';
import {View} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {iconSize} from '../../../../style/constants';

type Props = {
  infoStatus?: string;
};

const InfoIcon = (props: Props) => {
  const styles = useStyles(props);
  let infoIcon: string | null;

  switch (props.infoStatus) {
    case 'error':
      infoIcon = 'alert-circle-outline';
      break;
    case 'success':
      infoIcon = 'checkmark-circle-outline';
      break;
    case 'warning':
      infoIcon = 'ios-warning-outline';
      break;
    default:
      return null;
  }
  return (
    infoIcon && (
      <View style={styles.rightIconWrapper}>
        <Ionicons
          name={infoIcon}
          style={styles.infoIcon}
          size={iconSize.large}
        />
      </View>
    )
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  let rightIconColor: string | undefined = theme.colors?.primary;
  switch (props.infoStatus) {
    case 'error':
      rightIconColor = theme.colors?.error;
      break;
    case 'success':
      rightIconColor = theme.colors?.success;
      break;
    case 'warning':
      rightIconColor = theme.colors?.warning;
      break;
    default:
      rightIconColor = theme.colors?.primary;
      break;
  }
  return {
    rightIconWrapper: {
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    infoIcon: {
      color: rightIconColor,
    },
  };
});
export default withTheme(InfoIcon, '');
