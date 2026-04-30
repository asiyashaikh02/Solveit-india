# SolveIt India: Expert Consultation System Design

## 1. Database Schema (Firestore/NoSQL Preferred)

### `users` (Collection)
- `uid`: string (Primary Key)
- `name`: string
- `email`: string
- `phoneNumber`: string
- `preferredLanguage`: string
- `createdAt`: timestamp

### `experts` (Collection)
- `eid`: string (Primary Key)
- `name`: string
- `expertType`: 'CA' | 'CS' | 'Lawyer'
- `specializations`: string[] (e.g., ['GST', 'Divorce', 'IPR'])
- `experienceYears`: number
- `rating`: number (average)
- `reviewCount`: number
- `basePrice`: number (INR)
- `isOnline`: boolean
- `responseTimeAvg`: number (minutes)
- `profilePic`: string (URL)
- `verificationStatus`: 'verified' | 'pending'

### `bookings` (Collection)
- `bid`: string (Primary Key)
- `userId`: string (Ref users)
- `expertId`: string (Ref experts)
- `status`: 'scheduled' | 'active' | 'completed' | 'cancelled'
- `scheduledAt`: timestamp
- `duration`: number (minutes)
- `problemDescription`: string
- `category`: string

### `categories` (Collection)
- `id`: string
- `name`: string
- `parentType`: 'CA' | 'CS' | 'Lawyer'
- `subServices`: string[]

---

## 2. API Structure

### `POST /api/intent-matcher`
**Purpose**: Detect intent and route to category.
- **Input**: `{ prompt: string }`
- **Output**: `{ category: string, subCategory: string, confidence: number }`

### `GET /api/experts`
**Purpose**: List filtered experts.
- **Query Params**: `type`, `category`, `isOnline`
- **Output**: `Expert[]`

### `POST /api/bookings/create`
**Purpose**: Instantiate a consultation.
- **Input**: `{ userId, expertId, slot, problemDetails }`
- **Output**: `{ bookingId, paymentLink }`

### `GET /api/expert-availability`
**Purpose**: Real-time availability check.
- **Input**: `{ expertId }`
- **Output**: `{ slots: string[], nextAvailable: timestamp }`

---

## 3. Matching Algorithm Logic

1.  **Intent Capture**: User types "Divorce help in Mumbai".
2.  **Entity Extraction**: 
    -   `Service`: Legal Consultation
    -   `Sub-service`: Family Law -> Divorce
    -   `Location`: Mumbai (Optional for online)
3.  **Filtration**: Find experts where `expertType == 'Lawyer'` AND `specializations` includes `Divorce`.
4.  **Ranking (Weightage)**:
    -   `isOnline`: 0.4
    -   `rating`: 0.3
    -   `responseTime`: 0.2
    -   `experience`: 0.1
5.  **Output**: Top 3 experts displayed in the Smart Panel.

---

## 4. Mobile Navbar UX strategy

1.  **Hamburger Menu**: Opens a full-screen overlay.
2.  **Accordion Categories**: "Consult an Expert" becomes an expandable accordion.
3.  **Step-by-step Selection**: Instead of a mega menu, use a breadcrumb-style mobile flow (Type -> Category -> Expert).
4.  **Floating Action Button**: Fixed "Talk Now" button at the bottom right for instant access.
