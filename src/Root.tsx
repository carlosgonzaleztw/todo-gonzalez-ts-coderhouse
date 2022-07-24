import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import React, { createContext } from 'react';
import TabNavigator from './navigation/TabNavigator';
import { useFirebaseAuth } from './utils/auth.utils';
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  doc,
} from 'firebase/firestore/lite';

const Root = () => {
  return <TabNavigator />;
};

export default Root;
