import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import {
  getDatabase, ref, set, push, child, onValue,
} from 'firebase/database';

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

export const appAuth = getAuth();

// Get a reference to the database service
export const databaseRef = getDatabase(firebase);

export const firebaseQueries = {
  createTodo: (data) => push(child(ref(databaseRef), 'todos/'), { ...data }),

  getTodos: (key, cb) => onValue(ref(databaseRef, key ? `todos/${key}` : 'todos/'), cb),

  updateOrDestroyTodo: (data, key) => set(ref(databaseRef, `todos/${key}`), data && { ...data }),
};

export default firebase;
