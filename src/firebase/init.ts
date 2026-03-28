import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Initializes Firebase and returns the SDK instances.
 * Enhanced with safeguards against empty automatic configurations that can 
 * cause "auth/invalid-api-key" errors during build or startup.
 */
export function initializeFirebase() {
  const apps = getApps();
  
  if (apps.length > 0) {
    const existingApp = apps[0];
    // If the existing app is valid, use it.
    if (existingApp.options.apiKey && existingApp.options.apiKey !== "") {
      return getSdks(existingApp);
    }
    // If the existing app is "broken", we'll continue to re-init with the reliable config.
  }

  let firebaseApp: FirebaseApp;
  
  try {
    // Attempt automatic initialization (standard for Firebase App Hosting)
    firebaseApp = initializeApp();
    
    // If the automatic app has no API key or an empty one, it's invalid.
    if (!firebaseApp.options.apiKey || firebaseApp.options.apiKey === "") {
      throw new Error('Incomplete automatic configuration');
    }
  } catch (e) {
    // Fallback to the reliable config provided in src/firebase/config.ts
    try {
      // If we already have apps, we might be in a state where we need to re-init 
      // with the valid hardcoded config.
      if (getApps().length > 0) {
        firebaseApp = getApp();
      } else {
        firebaseApp = initializeApp(firebaseConfig);
      }
    } catch (innerError) {
      firebaseApp = getApp();
    }
  }

  return getSdks(firebaseApp);
}

/**
 * Safely retrieves Firebase SDK instances.
 * Ensures we don't return "broken" instances of Auth that would crash the app.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  let auth: Auth | null = null;
  let firestore: Firestore | null = null;
  let storage: FirebaseStorage | null = null;

  try {
    // Only attempt to initialize Auth if we have a valid API key.
    if (firebaseApp.options.apiKey && firebaseApp.options.apiKey !== "") {
      auth = getAuth(firebaseApp);
    }
    
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Firebase SDK initialization failed:', e);
    }
  }

  return {
    firebaseApp,
    auth: auth!,
    firestore: firestore!,
    storage: storage!
  };
}
