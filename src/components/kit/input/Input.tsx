import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
  Pressable,
  TextStyle,
} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {RCTheme} from '../../../style/theme';
import {fontSize} from '../../../style/constants';
import InfoIcon from './subComponents/InfoIcon';
import Icon from './subComponents/Icon';

type Props = Partial<TextInputProps> & {
  hasBorder?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  leftIcon?: Element;
  leftIconFilled?: boolean;
  rightIcon?: Element;
  rightIconFilled?: boolean;
  widthSize?: 'half' | 'full';
  infoStatus?: 'error' | 'warning' | 'success';
  label?: string; // overriding :: default label props is having type number
  onChangeText?: (...event: any[]) => void;
  theme?: RCTheme;
  style?: StyleProp<ViewStyle>;
};

const Input = (props: Props) => {
  const [size, setSize] = useState<number>(fontSize.large); // label's font size
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [empty, setEmpty] = useState(true);
  const inputRef = React.useRef<TextInput>(null);

  const anim = useRef(new Animated.Value(0)).current;
  const styles = useStyles(props);
  const onFocus = () => {
    setIsFocused(true);
    setSize(fontSize.small);
    Animated.timing(anim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onBlur = () => {
    setIsFocused(false);
    console.log('isempty', empty);
    setSize(empty ? fontSize.large : fontSize.small);
    Animated.timing(anim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onSubmitEditing = event => {
    if (event.nativeEvent.text === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const animY: Animated.AnimatedInterpolation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [empty ? 0 : -13, -13],
  });

  const textStyle: Animated.AnimatedProps<StyleProp<TextStyle>> = {
    fontSize: size,
    transform: [{translateX: 7}, {translateY: animY}],
  };

  useEffect(() => {
    if (
      (props.value ? false : true) &&
      (props.placeholder ? false : true) &&
      !isFocused &&
      empty
    ) {
      setEmpty(true);
    }
    setSize(empty ? fontSize.large : fontSize.small);
  }, []);

  return (
    <Pressable
      style={[styles.container, props.style]}
      onPress={() => {
        inputRef.current?.focus();
      }}>
      {props.leftIcon && (
        <Icon
          position="left"
          icon={props.leftIcon}
          iconFilled={props.leftIconFilled}
          rounded={props.rounded}
        />
      )}

      <View style={styles.inputWrapper}>
        {props.label && (
          <Animated.Text style={[styles.label, textStyle]}>
            {props.label}
          </Animated.Text>
        )}

        <TextInput
          ref={inputRef}
          {...props}
          style={styles.textInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={props.onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={props.theme?.colors.grey3}
          blurOnSubmit={true}
        />
      </View>
      {props.infoStatus ? (
        <InfoIcon infoStatus={props.infoStatus} />
      ) : (
        props.rightIcon && (
          <Icon
            position="right"
            icon={props.rightIcon}
            iconFilled={props.rightIconFilled}
            rounded={props.rounded}
          />
        )
      )}
    </Pressable>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  let infoColor;
  switch (props.infoStatus) {
    case 'error':
      infoColor = theme.colors?.error;
      break;
    case 'success':
      infoColor = theme.colors?.success;
      break;
    case 'warning':
      infoColor = theme.colors?.warning;
      break;
    default:
      infoColor = theme.colors?.primaryLight;
      break;
  }

  const borderSize: number = props.hasBorder ? 1 : 0.2,
    borderRadius: number = props.rounded ? 8 : 0;

  return {
    container: {
      backgroundColor: theme.colors?.background,
      flexDirection: 'row',
      width: props.widthSize === 'half' ? '48%' : '100%',
      marginVertical: 8,
      overflow: 'hidden',
      borderWidth: borderSize,
      borderColor: infoColor,
      borderRadius: borderRadius,
      elevation: props.shadow ? 8 : 0,
      shadowColor: theme.colors?.grey1,
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    inputWrapper: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
      padding: 4,
    },
    textInput: {
      fontSize: fontSize.large,
      top: props.label && 8,
      color: theme.colors?.grey5,
    },
    label: {
      position: 'absolute',
      elevation: 2,
      shadowColor: 'transparent',
      color: theme.colors?.primaryDark,
    },
  };
});
export default withTheme(Input, '');
