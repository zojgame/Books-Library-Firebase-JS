import { firebaseConfig } from './config'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);