import React from 'react';
import {View} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';

type Props = {
  position?: 'left' | 'right';
  icon: Element;
  iconFilled?: boolean;
  rounded?: boolean;
};

const Icon = (props: Props) => {
  const styles = useStyles(props);
  return <View style={styles.iconWrapper}>{props.icon}</View>;
};

const useStyles = makeStyles((theme, props: Props) => {
  let paddingLeft = 0,
    paddingRight = 0;

  if (props.position === 'left') {
    paddingRight = 0;
    paddingLeft = 8;
    if (props.rounded) {
      paddingLeft = 14;
    }
    if (props.iconFilled) {
      paddingRight = 12;
    }
  }
  return {
    iconWrapper: {
      justifyContent: 'center',
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      backgroundColor: props.iconFilled
        ? theme.colors?.primary
        : theme.colors?.background,
    },
  };
});
export default withTheme(Icon, '');
