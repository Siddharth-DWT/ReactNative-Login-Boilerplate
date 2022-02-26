import React from 'react';
import {
  Button as RNEButton,
  ButtonProps,
  makeStyles,
  withTheme,
} from 'react-native-elements';

import {RCTheme} from '../../../style/theme';
import {fontSize} from '../../../style/constants';

type Props = Partial<ButtonProps> & {
  color?: string;
  buttonSize?: 'small' | 'large' | 'normal';
  widthSize?: 'half' | 'full' | 'content';
  type?: 'solid' | 'outline' | 'clear';
  rounded?: boolean;
  shadow?: boolean;
  theme?: RCTheme;
  disabled?: boolean;
};

const DWTButton = (props: Props) => {
  const styles = useStyles(props);

  return (
    <RNEButton
      {...props}
      buttonStyle={[styles.buttonStyle2, styles.buttonStyle, props.buttonStyle]}
      titleStyle={styles.titleStyle}
      disabled={props.disabled}
      disabledStyle={styles.disabledStyle}
      disabledTitleStyle={styles.disabledTitleStyle}
      containerStyle={[
        styles.container,
        styles.shadowStyle,
        props.containerStyle,
      ]}
    />
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  const buttonColor: string = props.theme?.colors[props.color ?? 'primary'];

  const widths: Record<string, string> = {
    full: '100%',
    half: '40%',
    content: 'auto',
  };

  const borderRadius: number = props.rounded ? 8 : 0;

  let buttonStyle2;
  let disabledStyle;

  switch (props.type) {
    case 'outline':
      buttonStyle2 = {
        backgroundColor: theme?.colors?.transparent,
        borderWidth: 2,
        borderColor: buttonColor,
      };
      break;
    case 'clear':
      buttonStyle2 = {
        backgroundColor: theme?.colors?.transparent,
      };
      break;
    default:
      buttonStyle2 = {
        backgroundColor: buttonColor ?? theme.colors?.primary,
      };
  }

  switch (props.type) {
    case 'outline':
      disabledStyle = {
        backgroundColor: props.theme?.colors.background,
        borderWidth: 2,
        borderColor: theme.colors?.grey3,
      };
      break;
    default:
      disabledStyle = {
        backgroundColor: theme.colors?.disabled,
      };
  }

  return {
    container: {
      width: widths[props.widthSize ?? 'full'],
      borderRadius: borderRadius,
    },
    buttonStyle2: buttonStyle2,
    buttonStyle: {
      paddingHorizontal: 16,
      justifyContent: 'center',
      borderRadius: borderRadius,
    },
    disabledStyle: disabledStyle,
    disabledTitleStyle: {
      color: theme.colors?.grey3,
    },
    titleStyle: {
      color: ['outline', 'clear'].includes(props.type ?? '')
        ? buttonColor
        : theme.colors?.white,
      fontSize: fontSize[props.buttonSize ?? 'normal'],
    },

    shadowStyle: props.shadow
      ? {
          shadowColor: theme.colors?.primaryLight,
          shadowOffset: {
            height: 8,
            width: 8,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 10,
        }
      : {},
  };
});

export default withTheme(DWTButton, '');
