import React from 'react';
import {Text, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {makeStyles, withTheme} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Stacks from '../navigation/stack';
import {RCTheme} from '../style/theme';
import {iconSize} from '../style/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

type Props = {
  theme?: RCTheme;
};

const TabBar = (props: any) => {
  const {state, descriptors, navigation, theme} = props;
  const styles = useStyles();

  const renderIcon = (name: string, style: StyleProp<ViewStyle>) => {
    switch (name) {
      case 'Home':
        return <AntDesign name="home" style={style} />;
      case 'Cart':
        return <Ionicons name="cart-outline" style={style} />;
      case 'Favourites':
        return <AntDesign name="hearto" style={style} />;
      case 'Settings':
        return <AntDesign name="setting" style={style} />;
    }
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused: boolean = state.index === index;
        const onPressIcon = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View style={styles.iconWrapper} key={route.key}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPressIcon}
              style={isFocused && styles.focusedTab}
              onLongPress={onLongPress}>
              {renderIcon(
                route.name,
                isFocused ? styles.focusedIcon : styles.icon,
              )}
              {!isFocused && (
                <Text style={styles.tabBarLabel}>{route.name}</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const BottomTab = (bottomTabProps: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{lazy: false, headerShown: false}}
      tabBar={props => <TabBar {...props} theme={bottomTabProps.theme} />}>
      <Tab.Screen name="Home" component={Stacks.HomeStack} />
      <Tab.Screen name="Favourites" component={Stacks.HomeStack} />
      <Tab.Screen name="Cart" component={Stacks.HomeStack} />
      <Tab.Screen name="Settings" component={Stacks.SettingStack} />
    </Tab.Navigator>
  );
};

const useStyles = makeStyles(theme => {
  const DIMENSION: number = 70;

  return {
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors?.primaryDark,
    },
    iconWrapper: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
    },
    icon: {
      alignSelf: 'center',
      fontSize: iconSize.normal,
      color: theme.colors?.white,
    },
    focusedIcon: {
      alignSelf: 'center',
      fontSize: iconSize.normal,
      color: theme.colors?.primaryDark,
    },
    tabBarLabel: {
      textAlign: 'center',
      color: theme.colors?.white,
    },
    focusedTab: {
      top: -18,
      justifyContent: 'center',
      height: DIMENSION,
      width: DIMENSION,
      borderRadius: DIMENSION,
      backgroundColor: theme.colors?.info,
      shadowColor: 'transparent',
    },
  };
});

export default withTheme(BottomTab, '');
