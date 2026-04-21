import { updateState } from "@/lib/stateStore";

export async function POST() {
  console.log('[ACTION TRIGGERED]: Unlocking front door for emergency access.');
  
  updateState({ door: 'unlocked' });

  return Response.json({
    success: true
  });
}
