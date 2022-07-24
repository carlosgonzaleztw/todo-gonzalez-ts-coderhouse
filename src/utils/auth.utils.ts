import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useFirebaseAuth = () => {
  const auth = getAuth();
  signInAnonymously(auth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);
  return user;
};
