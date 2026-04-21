import { updateState } from "@/lib/stateStore";

export async function POST() {
  console.log('[ACTION TRIGGERED]: Triggering therapeutic amber lights.');
  
  updateState({ lights: 'amber' });

  return Response.json({
    success: true
  });
}
