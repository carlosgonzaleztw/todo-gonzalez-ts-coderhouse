import { ActivityIndicator } from 'react-native';
import React, { createContext } from 'react';
import { useFonts } from 'expo-font';
import ThemeColors from './src/styles/colors';
import Root from './src/Root';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { useFirebaseAuth } from './src/utils/auth.utils';
const firebaseConfig = {
  apiKey: 'AIzaSyAu42kwcoijXaPz7v8Em-GrVRGojEzg00U',
  authDomain: 'entregafinalrn.firebaseapp.com',
  projectId: 'entregafinalrn',
  storageBucket: 'entregafinalrn.appspot.com',
  messagingSenderId: '481801698296',
  appId: '1:481801698296:web:0e52f87edf5a1904d9340d',
  measurementId: 'G-BEP3Q0JPV6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const AuthContext = createContext<User | null>(null);

export default function App() {
  const [loaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'poppins-italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color={ThemeColors.green} />;
  }
  const user: User | null = useFirebaseAuth();

  return (
    <AuthContext.Provider value={user}>
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}
