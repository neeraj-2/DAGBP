import 'firebase/app';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  };
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };