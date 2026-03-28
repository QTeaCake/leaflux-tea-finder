import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Initializes Firebase and returns the SDK instances.
 * This is designed to be safe for both client-side and server-side pre-rendering.
 * It prioritizes the hardcoded config if the automatic environment-based 
 * initialization provides an incomplete configuration (common during build steps).
 */
export function initializeFirebase() {
  const apps = getApps();
  
  if (apps.length > 0) {
    const existingApp = apps[0];
    // If the existing app is valid, use it.
    if (existingApp.options.apiKey) {
      return getSdks(existingApp);
    }
    // If the existing app is "broken" (no apiKey), we'll try to get or create a valid one.
  }

  let firebaseApp: FirebaseApp;
  
  try {
    // Attempt automatic initialization (standard for Firebase App Hosting)
    firebaseApp = initializeApp();
    
    // If the automatic app has no API key, it's invalid for Auth.
    // We throw to trigger the fallback to the hardcoded config.
    if (!firebaseApp.options.apiKey) {
      throw new Error('Incomplete automatic configuration');
    }
  } catch (e) {
    // Fallback to the reliable config provided in src/firebase/config.ts
    try {
      // If the [DEFAULT] app already exists but is broken, we try to initialize a named app
      // or just use the config if we can. initializeApp(config) will throw if [DEFAULT] exists.
      if (getApps().length > 0) {
        // We can't easily re-init [DEFAULT], so we get the existing one.
        // If it's truly broken, getAuth(app) will still throw later, but we catch that in getSdks.
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
 * Catches initialization errors (like missing API keys) to prevent build-time crashes.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  let auth: Auth | null = null;
  let firestore: Firestore | null = null;
  let storage: FirebaseStorage | null = null;

  try {
    // Only attempt to initialize Auth if we have an API key to avoid crashes.
    if (firebaseApp.options.apiKey) {
      auth = getAuth(firebaseApp);
    }
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
  } catch (e) {
    // Log error but don't throw, allowing the build to continue.
    // The UI components handle null services gracefully via the FirebaseProvider.
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
