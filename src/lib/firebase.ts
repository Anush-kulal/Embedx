// src/lib/firebase.ts
// Firebase initialization and Firestore status management for Project Sentinel
//
// Usage:
//   import { updateStatus, listenToStatus } from "@/lib/firebase";
//
// Fill in your Firebase project config below before use.
// Get these values from: Firebase Console → Project Settings → Your apps → Config

import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";

// ---------------------------------------------------------------------------
// Firebase Configuration (placeholder — replace with your project values)
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCy6vHiWF2KxXWnOjFstMKCKj8Upz8woVc",
  authDomain: "embedex-6661d.firebaseapp.com",
  projectId: "embedex-6661d",
  storageBucket: "embedex-6661d.firebasestorage.app",
  messagingSenderId: "480289079314",
  appId: "1:480289079314:web:58f329b731200d42d258cb",
  measurementId: "G-M3QT4F0JGR"
};

// ---------------------------------------------------------------------------
// Singleton initialisation
// ---------------------------------------------------------------------------
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Default patient ID — in production this would come from auth context
const PATIENT_ID = "user1";

// Firestore collection / document path
const COLLECTION = "patients";

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------
export type PatientStatus =
  | "IDLE"
  | "AWAITING_VOICE"
  | "CRITICAL_ALERT"
  | "MONITORING";

export interface PatientDocument {
  patientId: string;
  status: PatientStatus;
  lastActive: ReturnType<typeof serverTimestamp> | Date;
  emergencyLock: "locked" | "unlocked";
}

// ---------------------------------------------------------------------------
// updateStatus
// ---------------------------------------------------------------------------
/**
 * Writes the patient's current status to Firestore.
 *
 * Automatically sets `lastActive` to the server timestamp and keeps the
 * emergency lock state in sync (unlocked only during CRITICAL_ALERT).
 *
 * @param status - The new patient status to persist.
 * @param patientId - Override the default patient ID if needed.
 */
export async function updateStatus(
  status: PatientStatus,
  patientId: string = PATIENT_ID
): Promise<void> {
  const docRef = doc(db, COLLECTION, patientId);

  const data: PatientDocument = {
    patientId,
    status,
    lastActive: serverTimestamp() as unknown as Date,
    emergencyLock: status === "CRITICAL_ALERT" ? "unlocked" : "locked",
  };

  await setDoc(docRef, data, { merge: true });
  console.log(`[Firebase] Status updated → ${status}`);
}

// ---------------------------------------------------------------------------
// listenToStatus
// ---------------------------------------------------------------------------
/**
 * Attaches a real-time Firestore snapshot listener to the patient document.
 *
 * The callback fires immediately with the current document state, then again
 * on every subsequent change. Returns an unsubscribe function — call it when
 * the component unmounts or when the listener is no longer needed.
 *
 * @param callback - Invoked with the latest PatientDocument on each change.
 * @param patientId - Override the default patient ID if needed.
 * @returns An unsubscribe function to detach the listener.
 */
export function listenToStatus(
  callback: (data: PatientDocument) => void,
  patientId: string = PATIENT_ID
): Unsubscribe {
  const docRef = doc(db, COLLECTION, patientId);

  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data() as PatientDocument;
      console.log(`[Firebase] Snapshot received → ${data.status}`);
      callback(data);
    } else {
      console.warn(`[Firebase] No document found for patient: ${patientId}`);
    }
  });
}

// ---------------------------------------------------------------------------
// Exports for direct access (advanced usage)
// ---------------------------------------------------------------------------
export { app, db, firebaseConfig };
