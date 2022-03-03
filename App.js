import React from 'react';
import {Settings} from './src/container';
import Stack from './src/navigation/Stack';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Settings.Provider>
      <Stack />
    </Settings.Provider>
  );
};

export default App;
