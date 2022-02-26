import React from 'react';
import {fontSize} from '../../../style/constants';
import {makeStyles, withTheme} from 'react-native-elements';
import {Text as RNText, TextProps} from 'react-native';

type Props = TextProps & {
  size?:
    | 'extraSmall'
    | 'small'
    | 'normal'
    | 'large'
    | 'extraLarge'
    | 'jumbo'
    | 'jumboPlus'
    | 'jumboXPlus';
  fontStyle?: 'normal' | 'italic';
  weight?: 'thinnest' | 'thinner' | 'normal' | 'bold' | 'extraBold';
  color?:
    | 'white'
    | 'dark'
    | 'textHeading'
    | 'textSubHeading'
    | 'textPara'
    | 'success'
    | 'error'
    | 'link';
};

const Text = (props: Props) => {
  const styles = useStyles(props);
  return <RNText {...props} style={[styles.textStyle, props.style]} />;
};

const useStyles = makeStyles((theme, props: Props) => {
  let fontWeight = 'normal';
  switch (props.weight) {
    case 'thinnest':
      fontWeight = '100';
      break;
    case 'thinner':
      fontWeight = '300';
      break;
    case 'normal':
      fontWeight = '400';
      break;
    case 'bold':
      fontWeight = 'bold';
      break;
    case 'extraBold':
      fontWeight = '900';
      break;
    default:
      fontWeight = '400';
      break;
  }
  return {
    textStyle: {
      color: theme.colors?.[props.color ?? 'textPara'],
      fontSize: fontSize[props.size ?? 'normal'],
      fontStyle: props.fontStyle ?? 'normal',
      fontWeight: fontWeight,
    },
  };
});

export default withTheme(Text, '');
