import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

let firebaseApp: FirebaseApp;
// Enable if you want local emulation.
//*  firebase emulators:start
//! Attempted to read from .env w/ Vite config but no luck
//! not sure why but just forcing it like this below works fine.
const useLocalEmulator = true;

export const setupFirebase = () => {
  try {
    firebaseApp = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
      appId: import.meta.env.VITE_FIREBASE_APPID,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error setting up Firebase application')
    // eslint-disable-next-line no-console
    console.error({ error })
  }
  
  return firebaseApp;
};

let database: ReturnType<typeof getDatabase>;

export const useRealtimeDatabase = () => {
  if (!database) {
    database = getDatabase(firebaseApp)
    if (useLocalEmulator) {
      connectDatabaseEmulator(database, 'localhost', 9000)
      console.log('connected to db emulator')
    }
  }
  return database;
}

let storage: ReturnType<typeof getStorage>;

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useLocalEmulator) {
      connectStorageEmulator(storage, 'localhost', 9199);
      console.log('connected to storage emulator')

    }
  }
  return storage;
};
