import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {useColorScheme, ColorSchemeName} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme, darkTheme} from '../style/theme';
import Settings from '../container/Settings';
import Root from './Root';

const App = () => {
  const deviceTheme: ColorSchemeName = useColorScheme();
  return (
    <NavigationContainer>
      <ThemeProvider theme={deviceTheme === 'dark' ? darkTheme : lightTheme}>
        <Settings.Provider>
          <Root />
        </Settings.Provider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
