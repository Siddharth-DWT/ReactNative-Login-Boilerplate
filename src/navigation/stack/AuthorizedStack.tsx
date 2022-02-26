import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import ChangePassword from '../../screens/ChangePassword';
import NavHeader from '../../components/kit/NavHeader';

const Stack = createNativeStackNavigator();

const AuthorizedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          header: () => <NavHeader title="Change Password" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthorizedStack;
