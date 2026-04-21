import fs from 'fs';
import path from 'path';

const stateFilePath = path.join(process.cwd(), 'simulator-state.json');

export async function POST() {
  console.log('[ACTION TRIGGERED]: Resetting Home Environment to Default');
  
  // Reset state
  fs.writeFileSync(stateFilePath, JSON.stringify({ 
    lights: 'harsh_white', 
    door: 'locked' 
  }));

  return Response.json({
    status: "success",
    action: "environment_reset",
  });
}
