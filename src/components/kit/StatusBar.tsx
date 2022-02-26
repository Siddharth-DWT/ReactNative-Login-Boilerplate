import React from 'react';
import {withTheme} from 'react-native-elements';
import {RCTheme} from '../../style/theme';
import {StatusBar as RNStatusBar} from 'react-native';

type Props = {
  theme?: RCTheme;
  background?: string;
  style?: 'light-content' | 'dark-content';
};

const StatusBar = (props: Props) => {
  const statusBarStyle =
    props.style ?? props.theme?.name === 'dark'
      ? 'light-content'
      : 'dark-content';
  return (
    <RNStatusBar
      barStyle={statusBarStyle}
      backgroundColor={props.background ?? props.theme?.colors.background}
    />
  );
};

export default withTheme(StatusBar, '');
