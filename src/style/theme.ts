export interface PlatformColors {
  primary: string;
  secondary: string;
  grey: string;
  searchBg: string;
  success: string;
  error: string;
  warning: string;
}

const platformColors: Partial<PlatformColors> = {
  primary: '#33cc33',
  secondary: '#FF3366',
  grey: '#7d7d7d',
  searchBg: '#dcdce1',
  success: '#008000',
  error: '#cc0011',
  warning: '#ffc107',
};

const platformColorsDark: Partial<PlatformColors> = {
  primary: '#33cc33',
  secondary: '#FF3366',
  grey: '#ffffff',
  searchBg: '#393e42',
  success: '#008000',
  error: '#cc0011',
  warning: '#ffc107',
};

export type RCTheme = {
  name: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    textHeading: string;
    textSubHeading: string;
    textPara: string;
    white: string;
    black: string;
    grey0: string;
    grey1Light: string;
    grey1Dark: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    info: string;
    success: string;
    error: string;
    warning: string;
    disabled: string;
    divider: string;
    platform: Partial<PlatformColors>;
    background: string;
    darkerBackground: string;
    darkerBackground2: string;
    transparent: string;
  };
};

const lightTheme: RCTheme = {
  name: 'light',
  colors: {
    primary: '#009387',
    primaryLight: '#08d4c4',
    primaryDark: '#00665e',
    secondary: '#000000',
    secondaryLight: '#000000',
    secondaryDark: '#000000',
    textHeading: '#0d0d0d',
    textSubHeading: '#1a1a1a',
    textPara: '#262626',
    white: '#ffffff',
    black: '#1a1a1a', // 10% black
    grey0: '#f2f2f2',
    grey1Light: '#e6e6e6',
    grey1Dark: '#dedede',
    grey1: '#d9d9d9',
    grey2: '#bfbfbf',
    grey3: '#a6a6a6',
    grey4: '#8c8c8c',
    grey5: '#737373',
    info: '#e6e6e6',
    success: '#008000',
    error: '#e62e00',
    warning: '#ffc107',
    disabled: '#e6e6e6',
    divider: '#e6e6e6',
    platform: platformColors,
    background: '#f2f2f2',
    darkerBackground: '#e6e6e6',
    darkerBackground2: '#d9d9d9',
    transparent: 'transparent',
  },
};

const darkTheme: RCTheme = {
  name: 'dark',
  colors: {
    primary: '#009387',
    primaryLight: '#08d4c4',
    primaryDark: '#00665e',
    secondary: '#000000',
    secondaryLight: '#000000',
    secondaryDark: '#000000',
    textHeading: '#dedede',
    textSubHeading: '#bfbfbf',
    textPara: '#a6a6a6',
    white: '#ffffff',
    black: '#1a1a1a', // 10% black
    grey0: '#f2f2f2',
    grey1Light: '#e6e6e6',
    grey1Dark: '#dedede',
    grey1: '#d9d9d9',
    grey2: '#bfbfbf',
    grey3: '#a6a6a6',
    grey4: '#8c8c8c',
    grey5: '#737373',
    info: '#e6e6e6',
    success: '#008000',
    error: '#e62e00',
    warning: '#ffc107',
    disabled: '#e6e6e6',
    divider: '#e6e6e6',
    platform: platformColorsDark,
    background: '#1a1a1a',
    darkerBackground: '#262626',
    darkerBackground2: '#333333',
    transparent: 'transparent',
  },
};

export {lightTheme, darkTheme};
