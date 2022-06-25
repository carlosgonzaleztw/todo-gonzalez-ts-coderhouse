import { ActivityIndicator } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import ThemeColors from './src/styles/colors';
import Root from './src/Root';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [loaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'poppins-italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color={ThemeColors.green} />;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
