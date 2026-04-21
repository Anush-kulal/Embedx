import { updateState } from "@/lib/stateStore";

export async function POST() {
  console.log('[ACTION TRIGGERED]: Resetting Home Environment to Default');
  
  updateState({ 
    status: 'safe',
    lights: 'harsh_white', 
    door: 'locked' 
  });

  return Response.json({
    success: true,
    action: "environment_reset",
  });
}
