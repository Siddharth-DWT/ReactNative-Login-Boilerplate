import React from 'react';
import {ScrollView} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {fontSize} from '../style/constants';
import DWTView from '../components/kit/view/DWTView';
import Text from '../components/kit/text/Text';
import {DWTTheme} from '../style/theme';

type Props = {
  theme?: DWTTheme;
};

const Home = (props: Props) => {
  const styles = useStyles(props);

  return (
    <DWTView>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Home </Text>
        <Text style={styles.text}>User Type : user </Text>
      </ScrollView>
    </DWTView>
  );
};

const useStyles = makeStyles(() => {
  return {
    container: {
      marginHorizontal: 16,
      marginTop: 8,
    },
    text: {
      fontSize: fontSize.normal,
      padding: 8,
    },
  };
});

export default withTheme(Home, '');
