import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen/ListScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen/TaskDetailsScreen';
import ThemeColors from '../styles/colors';

const Stack = createNativeStackNavigator();

const isIOS = Platform.OS === 'ios';

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: {
          backgroundColor: isIOS ? ThemeColors.white : ThemeColors.primary,
        },
        headerTintColor: isIOS ? ThemeColors.primary : ThemeColors.white,
        headerTitleStyle: { fontFamily: 'poppins-bold' },
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
