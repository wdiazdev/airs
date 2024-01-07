// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'airs-b09ab.firebaseapp.com',
  projectId: 'airs-b09ab',
  storageBucket: 'airs-b09ab.appspot.com',
  messagingSenderId: '802673295423',
  appId: '1:802673295423:web:8e35ae1d69f0e2f377f88a',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
