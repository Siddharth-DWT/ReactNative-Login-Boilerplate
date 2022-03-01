import React from 'react';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {RCTheme} from '../../../style/theme';
import {iconSize} from '../../../style/constants';
import {withTheme, makeStyles, FullTheme} from 'react-native-elements';
import {View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import Avatar from '../avatar/Avatar';
import {User} from '../../../types/auth';

type Props = {
  theme?: RCTheme;
  style?: StyleProp<ViewStyle>;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  onPressIcon: () => void;
  iconBgColor?: string;
  item?: User | undefined | null;
  hasBorder?: boolean;
};

const ProfileIcon = (props: Props) => {
  const styles = useStyles(props);
  const {theme, item} = props;

  return (
    <View style={[styles.container, props.style]}>
      <Avatar
        source={{
          uri:
            item?.profilePicture ??
            'https://randomuser.me/api/portraits/men/75.jpg',
        }}
      />

      <TouchableOpacity onPress={props.onPressIcon} style={styles.addedIcon}>
        <FIcon
          name={props.iconName || 'comment-dollar'}
          size={props.iconSize || iconSize.normal}
          color={props.iconColor || theme?.colors?.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  const BORDER_WIDTH: number = props.hasBorder ? 3 : 0;
  const CONTAINER_SIZE = 150;
  const ADDED_ICON_SIZE = 40;
  return {
    container: {
      maxWidth: CONTAINER_SIZE,
      maxHeight: CONTAINER_SIZE,
      alignSelf: 'center',
    },
    addedIcon: {
      position: 'absolute',
      bottom: ADDED_ICON_SIZE - ADDED_ICON_SIZE / 2,
      left: ADDED_ICON_SIZE + 2 * (ADDED_ICON_SIZE / 2),
      height: ADDED_ICON_SIZE,
      width: ADDED_ICON_SIZE,
      borderRadius: ADDED_ICON_SIZE / 2,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 16,
      borderWidth: BORDER_WIDTH,
      borderColor: theme.colors?.primary,
      backgroundColor: props.iconBgColor || theme.colors?.white,
    },
  };
});

export default withTheme(ProfileIcon, '');
