import { db, isMock } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type NotificationType = 'EMAIL' | 'SMS';

export interface NotificationPayload {
  to: string;
  type: NotificationType;
  subject?: string;
  message: string;
  metadata: any;
}

/**
 * Simulates sending a notification and logs it to Firestore for audit/tracking.
 */
export const sendNotification = async (payload: NotificationPayload) => {
  console.log(`[Notification Service] Sending ${payload.type} to ${payload.to}: ${payload.message}`);
  
  if (isMock || !db) {
    console.log("[Notification Service] Mock record created (Skipping Firestore)");
    return;
  }

  try {
    // In a real-world scenario, you would trigger a Cloud Function here 
    // or call an external API like Twilio/SendGrid.
    await addDoc(collection(db, 'notifications'), {
      ...payload,
      status: 'SENT',
      sentAt: serverTimestamp(),
      delivered: true // Mocking successful delivery
    });
  } catch (error) {
    console.error('Failed to log notification in Firestore:', error);
    // Even if logging fails, in this simulation we "sent" it to console
  }
};

/**
 * Specifically handles booking confirmations for both parties.
 */
export const sendBookingConfirmation = async (details: {
  clientName: string;
  clientEmail: string;
  expertName: string;
  consultationType: string;
  date: string;
  time: string;
}) => {
  const { clientName, clientEmail, expertName, consultationType, date, time } = details;

  // 1. Notify Client
  await sendNotification({
    to: clientEmail,
    type: 'EMAIL',
    subject: '✅ Consultation Confirmed - SolveIt India',
    message: `Greetings ${clientName},\n\nYour ${consultationType} consultation with ${expertName} has been successfully booked.\n\nDetails:\n📅 Date: ${date}\n🕒 Time: ${time}\n\nOur expert will connect with you at the scheduled time. Thank you for choosing SolveIt India.`,
    metadata: { ...details, recipientType: 'CLIENT' }
  });

  // 2. Notify Expert (Simulation)
  // In a production app, the expert's email would be retrieved from the db.
  const expertEmail = `${expertName.toLowerCase().replace(/\s+/g, '.')}@solveit.in`;
  
  await sendNotification({
    to: expertEmail,
    type: 'EMAIL',
    subject: '📅 New Consultation Booked',
    message: `Hello ${expertName},\n\nYou have a new ${consultationType} consultation booking with ${clientName}.\n\nDetails:\n📅 Date: ${date}\n🕒 Time: ${time}\n\nPlease ensure you are available for the session.`,
    metadata: { ...details, recipientType: 'EXPERT' }
  });

  // 3. Send SMS to Client (Simulation)
  await sendNotification({
    to: '+91-XXXXXXXXXX', // Client phone would go here
    type: 'SMS',
    message: `SolveIt Info: Your consultation with ${expertName} on ${date} at ${time} is confirmed. Check your email for details.`,
    metadata: { ...details, recipientType: 'CLIENT' }
  });
};
