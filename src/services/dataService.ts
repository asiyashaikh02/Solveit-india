// src/services/dataService.ts
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db, isMock } from '../lib/firebase';
import { MOCK_FILINGS } from './mockData';

export const dataService = {
  getFilings: async (userId: string) => {
    if (isMock || !db) {
      console.log("Fetching Mock Filings for", userId);
      return MOCK_FILINGS;
    }

    try {
      const q = query(
        collection(db, 'filings'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Firestore Error:", error);
      return MOCK_FILINGS; // Fallback to mock on error
    }
  },

  createFiling: async (userId: string, data: any) => {
    if (isMock || !db) {
      console.log("Mock creating filing...");
      return { id: `mock-${Date.now()}`, ...data };
    }

    const docRef = await addDoc(collection(db, 'filings'), {
      ...data,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'In Progress'
    });
    
    return { id: docRef.id, ...data };
  }
};
