import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../../screens/LogIn';
import SignUp from '../../screens/SignUp';
import ForgotPassword from '../../screens/ForgotPassword';
import NavHeader from '../../components/kit/NavHeader';
import SplashScreen from '../../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const UnauthorizedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <NavHeader title="Sign Up" />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          header: () => <NavHeader title="Forgot Password" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;
