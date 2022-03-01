import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePassword from '../../screens/ChangePassword';
import NavHeader from '../../components/kit/NavHeader';
import Home from '../../screens/Home';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreenr"
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

export default HomeStack;
