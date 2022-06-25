import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './MainNavigator';
import SearchNavigator from './SearchNavigator';
import IonicIcons from '@expo/vector-icons/Ionicons';
import ThemeColors from '../styles/colors';

const BottomTabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="ListTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabs.Screen
        name="ListTab"
        component={MainNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonicIcons
              name={focused ? 'checkbox' : 'checkbox-outline'}
              size={25}
              color={focused ? ThemeColors.primary : ThemeColors.disabledText}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonicIcons
              name={focused ? 'search' : 'search-outline'}
              size={25}
              color={focused ? ThemeColors.primary : ThemeColors.disabledText}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default TabNavigator;
