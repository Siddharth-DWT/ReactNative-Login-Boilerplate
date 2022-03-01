import React from 'react';
import {Settings} from './src/container';
import Stack from './src/navigation/Stack';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
    <Settings.Provider>
      <Stack />
    </Settings.Provider>
  );
};

export default App;
