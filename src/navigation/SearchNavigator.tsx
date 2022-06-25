import { Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen/ListScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen/TaskDetailsScreen';
import ThemeColors from '../styles/colors';
import { TaskType } from '../types/task.type';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

export type SearchStackParamList = {
  Search: {};
  TaskDetails: { task: TaskType; viewOnly?: boolean };
};

const isIOS = Platform.OS === 'ios';

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: isIOS ? ThemeColors.white : ThemeColors.primary,
        },
        headerTintColor: isIOS ? ThemeColors.primary : ThemeColors.white,
        headerTitleStyle: { fontFamily: 'poppins-bold' },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        initialParams={{ viewOnly: true }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
