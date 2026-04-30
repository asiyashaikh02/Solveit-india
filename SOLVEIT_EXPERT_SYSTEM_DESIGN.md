# SolveItIndia Expert Consultation System Design

## 1. Backend Architecture (Event-Driven Microservices)
- **API Gateway**: Handles authentication (JWT), rate limiting, and request routing.
- **Consultation Service**: Manages expert profiles, availability calendars, and booking states.
- **Matching Engine (AI-Powered)**: Real-time service using Gemini + Vector Database (Pinecone/Milvus) to match user intent to expert skills.
- **Payment & Escrow**: Integrates with Razorpay/Stripe; holds funds in escrow until consultation completion.
- **RTC Service (Video/Audio)**: Webhook-based integration with Daily.co or 100ms for secure consultations.
- **Communication Service**: Kafka/RabbitMQ based worker to trigger WhatsApp/SMS/Email via Twilio or Gupshup.

## 2. Database Schema (Firestore/PostgreSQL)

### `Experts`
- `id`: UUID
- `profile`: { name, photo, bio, experience_years }
- `credentials`: { license_no, bar_council_id, ca_membership_no }
- `classification`: { type: 'CA' | 'CS' | 'LAWYER', specializations: [] }
- `pricing`: { chat_rate, call_rate, video_rate, base_fee }
- `metrics`: { rating, total_consultations, response_time_avg }
- `availability`: Map<Day, TimeSlot[]>

### `Bookings`
- `id`: UUID
- `clientId`: Ref(Users)
- `expertId`: Ref(Experts)
- `category`: String (e.g., 'Family Law - Divorce')
- `type`: 'CHAT' | 'CALL' | 'VIDEO'
- `scheduledAt`: Timestamp
- `status`: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
- `preConsultationData`: Text (AI generated summary)
- `paymentId`: Ref(Payments)

## 3. AI Matching Logic (Step-by-Step)
1. **Intent Extraction**: Gemini processes user input (`"Moving out of my rental but landlord keeping deposit"`) -> Logic Map: `Consumer & Civil` -> `Landlord-tenant issues`.
2. **Preference Scoring**: Search experts in the `Landlord-tenant` pool.
   - `Score = (0.4 * Rating) + (0.3 * Availability) + (0.2 * SuccessRate) + (0.1 * PriceProximity)`.
3. **Urgency Check**: If sentiment analysis detects high stress/legal threat, flag as "Talk Now" and prioritize Online + Fast Response experts.
4. **Dynamic Pricing**: Adjusts premium for "Instant Connect" during peak hours.

## 4. API Endpoints Structure
- `GET /api/experts/categories`: List all top-level and nested categories.
- `POST /api/matching/intent`: Takes string, returns category + suggested experts.
- `GET /api/experts/available`: Filtered list with slots.
- `POST /api/bookings/create`: Initialize booking + payment session.
- `POST /api/bookings/pre-summary`: Chatbot-collected info submission.

## 5. Scaling Strategy
- **Read-Replica DBs**: For expert discovery which is read-heavy.
- **Redis Caching**: For real-time expert availability.
- **ElasticSearch**: For complex filtering (location, language, court experience).
- **CDN**: For fast loading of expert assets and profile photos.
