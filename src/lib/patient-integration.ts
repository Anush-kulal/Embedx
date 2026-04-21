// src/lib/patient-integration.ts
// Integration layer: wires Firebase real-time status with voice recognition
//
// This module listens for Firestore status changes and triggers the
// appropriate voice recognition flow when the status becomes AWAITING_VOICE.
//
// State machine:
//   IDLE ──(anomaly detected)──▶ AWAITING_VOICE
//   AWAITING_VOICE ──("yes"/"okay")──▶ IDLE
//   AWAITING_VOICE ──("help" / 5s silence)──▶ CRITICAL_ALERT
//   CRITICAL_ALERT ──(auto-pushed to Firebase)──▶ (caregiver dashboard reacts)

import {
  listenToStatus,
  updateStatus,
  type PatientStatus,
  type PatientDocument,
} from "./firebase";
import {
  startVoiceRecognition,
  stopVoiceRecognition,
  isVoiceActive,
} from "./voice";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface PatientMonitorCallbacks {
  /** Called whenever the patient status changes (from any source). */
  onStatusChange?: (status: PatientStatus, source: "firebase" | "voice") => void;
  /** Called when voice recognition produces a result. */
  onVoiceResult?: (status: PatientStatus, transcript: string) => void;
  /** Called on any error during the monitoring lifecycle. */
  onError?: (error: Error) => void;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let unsubscribeFirestore: (() => void) | null = null;
let currentStatus: PatientStatus = "IDLE";

// ---------------------------------------------------------------------------
// handleStatusChange (internal)
// ---------------------------------------------------------------------------
/**
 * Core state-transition handler. Invoked whenever a new status arrives
 * from Firestore or from voice recognition resolution.
 */
function handleStatusChange(
  newStatus: PatientStatus,
  callbacks?: PatientMonitorCallbacks
): void {
  const previousStatus = currentStatus;
  currentStatus = newStatus;

  // Notify external callback
  callbacks?.onStatusChange?.(newStatus, "firebase");

  console.log(
    `[Integration] Status transition: ${previousStatus} → ${newStatus}`
  );

  // -----------------------------------------------------------------------
  // AWAITING_VOICE → activate speech recognition
  // -----------------------------------------------------------------------
  if (newStatus === "AWAITING_VOICE" && !isVoiceActive()) {
    console.log("[Integration] Activating voice recognition...");

    const started = startVoiceRecognition(
      async (resolvedStatus: PatientStatus, transcript: string) => {
        console.log(
          `[Integration] Voice resolved → ${resolvedStatus} ("${transcript}")`
        );

        callbacks?.onVoiceResult?.(resolvedStatus, transcript);
        callbacks?.onStatusChange?.(resolvedStatus, "voice");

        // CRITICAL_ALERT is already pushed to Firebase inside voice.ts via
        // updateStatus(), but we update our local tracking as well.
        currentStatus = resolvedStatus;
      }
    );

    if (!started) {
      // Speech API unavailable — escalate immediately for safety
      console.error(
        "[Integration] Voice recognition unavailable — escalating to CRITICAL_ALERT"
      );
      updateStatus("CRITICAL_ALERT").catch((err) =>
        callbacks?.onError?.(err as Error)
      );
    }
  }

  // -----------------------------------------------------------------------
  // Leaving AWAITING_VOICE → stop speech if still active
  // -----------------------------------------------------------------------
  if (newStatus !== "AWAITING_VOICE" && isVoiceActive()) {
    stopVoiceRecognition();
  }
}

// ---------------------------------------------------------------------------
// initPatientMonitor
// ---------------------------------------------------------------------------
/**
 * Initialises the full patient monitoring pipeline:
 *   1. Subscribes to Firestore real-time status updates.
 *   2. Reacts to AWAITING_VOICE by starting Web Speech API.
 *   3. Pushes CRITICAL_ALERT to Firebase instantly on escalation.
 *
 * Call `cleanupPatientMonitor()` to tear down all listeners.
 *
 * @example
 * ```ts
 * // In a React component or useEffect:
 * import { initPatientMonitor, cleanupPatientMonitor } from "@/lib/patient-integration";
 *
 * useEffect(() => {
 *   initPatientMonitor({
 *     onStatusChange: (status, source) => {
 *       console.log(`Status: ${status} (from ${source})`);
 *       setDisplayStatus(status);
 *     },
 *     onVoiceResult: (status, transcript) => {
 *       console.log(`Voice said: "${transcript}" → ${status}`);
 *     },
 *     onError: (err) => console.error("Monitor error:", err),
 *   });
 *
 *   return () => cleanupPatientMonitor();
 * }, []);
 * ```
 */
export function initPatientMonitor(
  callbacks?: PatientMonitorCallbacks,
  patientId?: string
): void {
  // Prevent duplicate subscriptions
  if (unsubscribeFirestore) {
    console.warn(
      "[Integration] Monitor already initialised — call cleanupPatientMonitor() first."
    );
    return;
  }

  console.log("[Integration] 🚀 Patient monitor initialised.");

  unsubscribeFirestore = listenToStatus((data: PatientDocument) => {
    try {
      handleStatusChange(data.status, callbacks);
    } catch (err) {
      callbacks?.onError?.(err as Error);
    }
  }, patientId);
}

// ---------------------------------------------------------------------------
// cleanupPatientMonitor
// ---------------------------------------------------------------------------
/**
 * Tears down all active listeners and stops voice recognition.
 * Safe to call multiple times.
 */
export function cleanupPatientMonitor(): void {
  if (unsubscribeFirestore) {
    unsubscribeFirestore();
    unsubscribeFirestore = null;
  }

  stopVoiceRecognition();
  currentStatus = "IDLE";

  console.log("[Integration] 🛑 Patient monitor cleaned up.");
}

// ---------------------------------------------------------------------------
// getCurrentStatus
// ---------------------------------------------------------------------------
/**
 * Returns the current locally-tracked patient status.
 * This is updated on every Firestore snapshot and voice resolution.
 */
export function getCurrentStatus(): PatientStatus {
  return currentStatus;
}
