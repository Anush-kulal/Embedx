import fs from 'fs';
import path from 'path';

const stateFilePath = path.join(process.cwd(), 'simulator-state.json');

if (!fs.existsSync(stateFilePath)) {
  fs.writeFileSync(stateFilePath, JSON.stringify({ 
    lights: 'harsh_white', 
    door: 'locked' 
  }));
}

export async function POST() {
  console.log('[ACTION TRIGGERED]: Unlocking Front Door for Emergency Access');
  
  // Update state
  const currentState = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
  currentState.door = 'unlocked';
  fs.writeFileSync(stateFilePath, JSON.stringify(currentState));

  return Response.json({
    status: "success",
    action: "door_unlocked",
  });
}
