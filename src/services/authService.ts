// src/services/authService.ts
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, isMock } from '../lib/firebase';
import { MOCK_USER } from './mockData';

export interface AuthProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

const mapUser = (user: User | any): AuthProfile => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  phoneNumber: user.phoneNumber,
});

export const authService = {
  onAuthStateChange: (callback: (user: AuthProfile | null) => void) => {
    if (isMock || !auth) {
      // Mock auth persistent simulation
      const savedUser = localStorage.getItem('mock_user');
      if (savedUser) {
        callback(JSON.parse(savedUser));
      } else {
        callback(null);
      }
      return () => {};
    }

    return onAuthStateChanged(auth, (user) => {
      callback(user ? mapUser(user) : null);
    });
  },

  signInWithGoogle: async (): Promise<AuthProfile> => {
    if (isMock || !auth) {
      console.log("Mocking Google Login...");
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
      return MOCK_USER;
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return mapUser(result.user);
  },

  logout: async () => {
    if (isMock || !auth) {
      localStorage.removeItem('mock_user');
      return;
    }
    await signOut(auth);
  },

  // Dummy OTP login for testing
  signInWithOTP: async (phone: string, code: string): Promise<AuthProfile> => {
     if (isMock || code === '123456') {
        console.log("OTP Bypass triggered or Mock Mode active");
        const user = { ...MOCK_USER, phoneNumber: phone };
        localStorage.setItem('mock_user', JSON.stringify(user));
        return user;
     }

     // Real OTP logic would go here using recatpchaVerifier + signInWithPhoneNumber
     // For now we treat it as demo/mock if not fully configured
     throw new Error("Phone OTP requires full production Firebase setup. Using '123456' as code works in demo mode.");
  }
};
