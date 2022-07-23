// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
