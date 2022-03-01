import React from 'react';
import {View} from 'react-native';
import {withTheme, makeStyles} from 'react-native-elements';
import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import Text from '../kit/text/Text';
import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  DeepMap,
  DeepPartial,
  FieldError,
} from 'react-hook-form';
import {RCTheme} from '../../style/theme';
import Input from '../kit/input/Input';

type Props = {
  control: Control<FieldValues, object>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: DeepMap<DeepPartial<FieldValues>, FieldError>;
  data: {
    name: string;
    title: string;
    inputType?: 'simple' | 'multiline';
    required: boolean;
  }[];
  theme: RCTheme;
};

const HookForm = (props: Props) => {
  const styles = useStyles(props);
  const {errors, control, theme} = props;
  return (
    <>
      {props.data.map((data, index) => {
        const error = errors[`${data.name}`];
        return (
          <View key={index} style={{flex: 1}}>
            <Controller
              control={control}
              rules={{
                required: data.required,
              }}
              render={({field: {onChange, value}}) => {
                switch (data.inputType) {
                  default:
                    return (
                      <Input
                        onChangeText={onChange}
                        value={value}
                        shadow={true}
                        label={data.title}
                        rounded={true}
                      />
                    );
                }
              }}
              name={data.name}
              defaultValue=""
            />
            {error && error.type === 'required' && (
              <Text style={styles.errorMessage} color="error">
                {data.title} is required
              </Text>
            )}
            {/* possible errors goes here ... */}
          </View>
        );
      })}
    </>
  );
};

const useStyles = makeStyles(() => {
  return {
    errorMessage: {
      bottom: 2,
      paddingLeft: 24,
    },
    textInput: {
      marginVertical: 8,
      marginHorizontal: 4,
      borderRadius: 8,
    },
  };
});

export default withTheme(HookForm, '');
