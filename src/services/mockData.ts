// src/services/mockData.ts

export const MOCK_USER = {
  uid: 'mock-user-123',
  email: 'founder@example.com',
  displayName: 'Startup Founder',
  phoneNumber: '+919999999999',
  emailVerified: true,
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=founder'
};

export const MOCK_FILINGS = [
  {
    id: 'SII-992-TX',
    name: 'GST Registration',
    status: 'In Progress',
    expert: 'CA Rahul Sharma',
    updatedAt: '2026-04-28T10:00:00Z',
    steps: [
      { label: 'Documents Uploaded', status: 'completed', time: 'April 25' },
      { label: 'Government Verification', status: 'current', time: 'In Progress' },
      { label: 'Certificate Issued', status: 'pending', time: 'Pending' }
    ]
  },
  {
    id: 'SII-881-CL',
    name: 'Trademark Filing',
    status: 'Completed',
    expert: 'Adv. Priya Verma',
    updatedAt: '2026-04-20T14:30:00Z',
    steps: [
      { label: 'Trademark Search', status: 'completed', time: 'April 15' },
      { label: 'Application Filed', status: 'completed', time: 'April 18' },
      { label: 'Receipt Generated', status: 'completed', time: 'April 20' }
    ]
  }
];

export const MOCK_EXPERTS = [
  { id: '1', name: 'CA Anirudh Gupta', role: 'GST Specialist', rating: 4.9, reviews: 128 },
  { id: '2', name: 'Adv. Sneha Mehta', role: 'IP & Trademarks', rating: 4.8, reviews: 95 },
];
