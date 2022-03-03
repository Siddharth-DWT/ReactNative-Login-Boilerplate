import React from 'react';
import Text from '../text/Text';
import {makeStyles, withTheme} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Modal from '../modal/Modal';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {RCTheme} from '../../../style/theme';

type Props = {
  theme: RCTheme;
};

const DeleteModal = (props: Props) => {
  const navigation = useNavigation();
  const styles = useStyles();

  const buttonHandler = () => {
    console.log('logout');
  };

  return (
    <Modal>
      <Text color="h5" style={styles.headerText}>{`Are you sure ? `}</Text>

      <View style={styles.buttonContainer}>
        <Button
          theme={props.theme}
          compact
          style={styles.buttonStyle}
          onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button
          theme={props.theme}
          mode="contained"
          compact
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('DeleteModal' as never)}>
          Delete
        </Button>
      </View>
    </Modal>
  );
};

const useStyles = makeStyles(() => {
  return {
    headerText: {
      //   marginVertical: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    buttonStyle: {
      marginHorizontal: 16,
    },
  };
});

export default withTheme(DeleteModal, '');
