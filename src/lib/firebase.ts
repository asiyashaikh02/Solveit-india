import { initializeApp, getApp, getApps, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { 
  getFirestore, 
  Firestore, 
  doc, 
  getDocFromServer, 
  initializeFirestore,
  onSnapshotsInSync
} from 'firebase/firestore';

/**
 * Robust Firebase Configuration Loader
 * Handles both environment variables (Vercel) and local config files (AI Studio).
 */
interface ExtendedFirebaseOptions extends FirebaseOptions {
  databaseId?: string;
  firestoreDatabaseId?: string; // Support both naming conventions
}

const getFirebaseConfig = (): ExtendedFirebaseOptions | null => {
  // Use a safe accessor for import.meta.env
  const meta = (import.meta as any);
  const env = meta.env || {};
  
  if (env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      databaseId: env.VITE_FIREBASE_DATABASE_ID,
    } as ExtendedFirebaseOptions;
  }

  try {
    // Attempt to load platform config if available
    // We use a try-catch because glob might not be available in all environments
    if (typeof meta.glob === 'function') {
      const configModules = meta.glob('/firebase-applet-config.json', { eager: true });
      const keys = Object.keys(configModules);
      if (keys.length > 0) {
        const platformConfig = (configModules[keys[0]] as any).default || configModules[keys[0]];
        return {
          ...platformConfig,
          databaseId: platformConfig.databaseId || platformConfig.firestoreDatabaseId
        } as ExtendedFirebaseOptions;
      }
    }
  } catch (e) {
    console.debug("Firebase platform config glob failed (expected in some local envs)");
  }

  return null;
};

const firebaseConfig = getFirebaseConfig();

// Hardened Mock check: If explicitly set to true OR if config looks invalid/missing
const env = (import.meta as any).env || {};
const isExplicitMock = env.VITE_USE_FIREBASE_MOCK === 'true';
const isMissingConfig = !firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('your_api_key');

export const isMock = isExplicitMock || isMissingConfig;

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

if (!isMock && firebaseConfig) {
  try {
    console.log("Attempting to initialize Firebase...");
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    // FORCING LONG POLLING: This fixes "Could not reach Cloud Firestore backend" 
    // in many proxy/sandboxed environments where WebSockets are flaky.
    const firestoreSettings = {
      experimentalForceLongPolling: true,
      useFetchStreams: false // Sometimes helps in extremely restrictive environments
    };

    db = initializeFirestore(app, firestoreSettings, firebaseConfig.databaseId);
    auth = getAuth(app);
    
    console.log("🔥 Firebase initialized (Offline-ready, Long Polling)");

    // Only monitor sync status instead of proactive pinging
    onSnapshotsInSync(db, () => {
      // Sync complete
    });

  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    // Log fatal error to window for easier debugging of white screens
    (window as any).__FATAL_ERROR__ = error;
  }
} else {
  console.log("🚀 Running in MOCK MODE - using local data only");
}

export { app, db, auth };
export default app;
