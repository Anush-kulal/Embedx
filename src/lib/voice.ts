// src/lib/voice.ts
// Web Speech API voice recognition module for Project Sentinel
//
// Designed to work in Chrome (uses webkitSpeechRecognition).
// Activates only when the patient status transitions to AWAITING_VOICE.
//
// Decision logic:
//   "yes" | "okay"   → resolves to IDLE (patient is fine)
//   "help"           → escalates to CRITICAL_ALERT
//   no response (5s) → escalates to CRITICAL_ALERT (non-responsive patient)

import { updateStatus, type PatientStatus } from "./firebase";

// ---------------------------------------------------------------------------
// Browser compatibility types
// ---------------------------------------------------------------------------
// The Web Speech API is not fully standardised; Chrome exposes it under
// the webkit prefix. We extend the Window interface to avoid TS errors.

interface IWindow extends Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const POSITIVE_KEYWORDS = ["yes", "yeah", "okay", "ok", "i'm fine", "fine", "i am fine"];
const NEGATIVE_KEYWORDS = ["help", "help me", "emergency", "danger"];
const SILENCE_TIMEOUT_MS = 5000; // 5 seconds of no response → critical

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let recognition: SpeechRecognition | null = null;
let silenceTimer: ReturnType<typeof setTimeout> | null = null;
let isListening = false;

// ---------------------------------------------------------------------------
// startVoiceRecognition
// ---------------------------------------------------------------------------
/**
 * Starts the Web Speech API listener.
 *
 * Call this when the patient status transitions to `AWAITING_VOICE`.
 * The function will:
 *   1. Begin listening for speech input.
 *   2. Start a 5-second silence timer.
 *   3. Analyse the transcript against known keywords.
 *   4. Call `updateStatus()` with the appropriate next state.
 *   5. Invoke the optional `onResult` callback with the outcome.
 *
 * @param onResult - Optional callback fired with the resolved status and transcript.
 * @returns `true` if recognition started, `false` if the browser doesn't support it.
 */
export function startVoiceRecognition(
  onResult?: (status: PatientStatus, transcript: string) => void
): boolean {
  // Prevent duplicate listeners
  if (isListening) {
    console.warn("[Voice] Recognition already active — ignoring duplicate call.");
    return true;
  }

  const windowRef = window as unknown as IWindow;
  const SpeechRecognitionAPI =
    windowRef.SpeechRecognition || windowRef.webkitSpeechRecognition;

  if (!SpeechRecognitionAPI) {
    console.error(
      "[Voice] Web Speech API not available. Use Chrome for full support."
    );
    return false;
  }

  recognition = new SpeechRecognitionAPI();
  recognition.continuous = false; // single utterance mode
  recognition.interimResults = false; // only final results
  recognition.lang = "en-US";
  recognition.maxAlternatives = 3; // consider top 3 interpretations

  // -----------------------------------------------------------------------
  // Silence timeout — if the patient doesn't respond within 5 seconds,
  // escalate immediately. This covers unconscious / incapacitated patients.
  // -----------------------------------------------------------------------
  const startSilenceTimer = () => {
    clearSilenceTimeout();
    silenceTimer = setTimeout(async () => {
      console.log("[Voice] No response detected — escalating to CRITICAL_ALERT");
      await updateStatus("CRITICAL_ALERT");
      onResult?.("CRITICAL_ALERT", "(no response)");
      stopVoiceRecognition();
    }, SILENCE_TIMEOUT_MS);
  };

  // -----------------------------------------------------------------------
  // Event: onresult
  // -----------------------------------------------------------------------
  recognition.onresult = async (event: SpeechRecognitionEvent) => {
    clearSilenceTimeout();

    // Collect all alternative transcripts and normalise
    const transcripts: string[] = [];
    for (let i = 0; i < event.results.length; i++) {
      for (let j = 0; j < event.results[i].length; j++) {
        transcripts.push(event.results[i][j].transcript.toLowerCase().trim());
      }
    }

    const fullTranscript = transcripts.join(" ");
    console.log(`[Voice] Heard: "${fullTranscript}"`);

    // Check for negative keywords first (higher priority — safety first)
    const isNegative = NEGATIVE_KEYWORDS.some((kw) =>
      transcripts.some((t) => t.includes(kw))
    );
    if (isNegative) {
      console.log("[Voice] Negative keyword detected → CRITICAL_ALERT");
      await updateStatus("CRITICAL_ALERT");
      onResult?.("CRITICAL_ALERT", fullTranscript);
      stopVoiceRecognition();
      return;
    }

    // Check for positive keywords
    const isPositive = POSITIVE_KEYWORDS.some((kw) =>
      transcripts.some((t) => t.includes(kw))
    );
    if (isPositive) {
      console.log("[Voice] Positive keyword detected → IDLE");
      await updateStatus("IDLE");
      onResult?.("IDLE", fullTranscript);
      stopVoiceRecognition();
      return;
    }

    // Unrecognised speech — restart listening with a fresh timeout
    console.log("[Voice] Unrecognised input — continuing to listen...");
    startSilenceTimer();
    try {
      recognition?.start();
    } catch {
      // Already running — ignore
    }
  };

  // -----------------------------------------------------------------------
  // Event: onerror
  // -----------------------------------------------------------------------
  recognition.onerror = async (event: SpeechRecognitionErrorEvent) => {
    console.error(`[Voice] Error: ${event.error}`);

    if (event.error === "no-speech") {
      // The browser reported no speech — silence timer will handle escalation
      return;
    }

    // For other errors (network, not-allowed, etc.) escalate as a safety measure
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      console.error("[Voice] Microphone access denied by user.");
      await updateStatus("CRITICAL_ALERT");
      onResult?.("CRITICAL_ALERT", "(mic denied)");
      stopVoiceRecognition();
    }
  };

  // -----------------------------------------------------------------------
  // Event: onend
  // -----------------------------------------------------------------------
  recognition.onend = () => {
    // If we're still supposed to be listening (e.g. no result yet), restart.
    // The silence timer is still running and will escalate if needed.
    if (isListening) {
      try {
        recognition?.start();
      } catch {
        // Already started or disposed — ignore
      }
    }
  };

  // -----------------------------------------------------------------------
  // Start
  // -----------------------------------------------------------------------
  try {
    recognition.start();
    isListening = true;
    startSilenceTimer();
    console.log("[Voice] 🎙️ Listening for patient response...");
    return true;
  } catch (err) {
    console.error("[Voice] Failed to start recognition:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// stopVoiceRecognition
// ---------------------------------------------------------------------------
/**
 * Stops the current voice recognition session and clears all timers.
 * Safe to call even if recognition is not active.
 */
export function stopVoiceRecognition(): void {
  isListening = false;
  clearSilenceTimeout();

  if (recognition) {
    try {
      recognition.abort();
    } catch {
      // Already stopped — ignore
    }
    recognition = null;
  }

  console.log("[Voice] 🔇 Recognition stopped.");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function clearSilenceTimeout(): void {
  if (silenceTimer !== null) {
    clearTimeout(silenceTimer);
    silenceTimer = null;
  }
}

/**
 * Returns whether voice recognition is currently active.
 */
export function isVoiceActive(): boolean {
  return isListening;
}
