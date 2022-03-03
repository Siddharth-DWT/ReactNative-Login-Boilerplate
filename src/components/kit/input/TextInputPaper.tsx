import React from 'react';
import {TextInputProps} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {RCTheme} from '../../../style/theme';

type Props = Partial<TextInputProps> & {
  theme?: RCTheme;
};

const TextInputPaper = (props: Props) => {
  const styles = useStyles(props);
  return <TextInput {...props} style={styles.textInput} theme={props.theme} />;
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    textInput: {
      backgroundColor: theme.colors?.darkerBackground,
      color: theme.colors.error,
      marginVertical: 8,
    },
  };
});
export default withTheme(TextInputPaper, '');
