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

const Root = () => {
  const user: User | null = useFirebaseAuth();
  console.log('USER', user?.uid);

  async function getAllTasks(db: Firestore) {
    const tasksCol = collection(db, 'tasks');

    // await setDoc(doc(tasksCol, '1'), {
    //   user: user?.uid,
    // });

    const q = query(tasksCol, where('user', '==', user?.uid));
    const tasksSnapshot = await getDocs(q);

    tasksSnapshot.forEach((task) => {
      console.log('TASK: ', task.data());
    });
  }
  try {
    getAllTasks(db);
  } catch (error) {
    console.log(error);
  }

  return (
    <AuthContext.Provider value={user}>
      <TabNavigator />
    </AuthContext.Provider>
  );
};

export default Root;
