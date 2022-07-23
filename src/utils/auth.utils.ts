import { getAuth, signInAnonymously } from 'firebase/auth';

const getUser = async () => {
  const auth = getAuth();
  const isSignedIn = await signInAnonymously(auth);
};
