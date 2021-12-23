import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  getDatabase, ref, set, push, child, onValue, equalTo, query, orderByChild,
} from 'firebase/database';
import PropTypes from 'prop-types';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const firebase = initializeApp(config);

getAnalytics();

const appAuth = getAuth();

export const FirebaseContext = React.createContext({
  user: null,
  loaded: false,
});

export const FirebaseProvider = ({
  children,
}) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(appAuth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoaded(true);
    });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FirebaseContext.Provider value={{ user, loaded }}>
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Get a reference to the database service
export const databaseRef = getDatabase(firebase);

export const Todos = {
  createTodo: (data) => push(child(ref(databaseRef), 'todos/'), { ...data }),

  getTodos: (email, cb) => onValue(query(ref(databaseRef, 'todos/'), orderByChild('email'), equalTo(email)), cb),

  updateOrDestroyTodo: (data, key) => set(ref(databaseRef, `todos/${key}`), data && { ...data }),
};

export const Users = {
  createProfile: (data) => push(child(ref(databaseRef), 'profiles/'), { ...data }),
  getProfile: (key, cb) => onValue(ref(databaseRef, key ? `profiles/${key}` : 'profiles/'), cb),
  updateOrDestroyProfile: (data, key) => set(ref(databaseRef, `profiles/${key}`), data && { ...data }),
  signUpUser: (email, password) => createUserWithEmailAndPassword(appAuth, email, password),
  logOutUser: () => signOut(appAuth),
  signInUser: (email, password) => signInWithEmailAndPassword(appAuth, email, password),
};

export default firebase;
