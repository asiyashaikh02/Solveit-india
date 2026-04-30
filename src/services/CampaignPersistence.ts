import { 
  collection, 
  onSnapshot, 
  addDoc, 
  setDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '@/src/lib/firebase';
import { Campaign } from './CampaignConfig';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const CampaignPersistence = {
  subscribeToCampaigns(callback: (campaigns: Campaign[]) => void) {
    if (!db) {
      console.log("Mock Mode: Campaigns subscription skipped (using static only)");
      callback([]);
      return () => {};
    }

    const q = query(collection(db, 'campaigns'), orderBy('priority', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const campaigns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
      callback(campaigns);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'campaigns');
    });
  },

  async saveCampaign(campaign: Omit<Campaign, 'id'> & { id?: string }) {
    if (!db) return;
    const path = 'campaigns';
    try {
      if (campaign.id) {
        await setDoc(doc(db, path, campaign.id), campaign);
      } else {
        await addDoc(collection(db, path), campaign);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async trackInteraction(campaignId: string, action: 'view' | 'click' | 'close') {
    if (!db) return;
    const path = 'user_interactions';
    try {
      await addDoc(collection(db, path), {
        campaignId,
        action,
        userId: auth?.currentUser?.uid || 'anonymous',
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }
};
