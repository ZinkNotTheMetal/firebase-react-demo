import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

let firebaseApp: FirebaseApp;
const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR ?? false;

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
  // eslint-disable-next-line no-console
  console.log('use emulator:', useEmulator)

  return firebaseApp;
};

let firestore: ReturnType<typeof getFirestore>;

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore(firebaseApp)
    if (useEmulator === true) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

let database: ReturnType<typeof getDatabase>;

export const getFirestoreDatabase = () => {
  if (!database) {
    database = getDatabase(firebaseApp)
    if (useEmulator === true) {
      connectDatabaseEmulator(database, 'localhost', 8081)
    }
  }
  return database;
}

let storage: ReturnType<typeof getStorage>;

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator === true) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};
