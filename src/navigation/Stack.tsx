import React, {useMemo} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {lightTheme, darkTheme} from '../style/theme';
import Settings from '../container/Settings';
import Root from './Root';

const App = () => {
  const {theme} = Settings.useContainer();
  const darkMode = useMemo(() => theme === 'dark', [theme]);

  return (
    <NavigationContainer>
      <ThemeProvider
        theme={darkMode ? darkTheme : lightTheme}
        useDark={darkMode}>
        <Root />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
