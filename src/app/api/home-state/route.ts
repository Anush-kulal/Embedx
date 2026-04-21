import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const stateFilePath = path.join(process.cwd(), 'simulator-state.json');

export async function GET() {
  if (!fs.existsSync(stateFilePath)) {
    return Response.json({ lights: 'harsh_white', door: 'locked' });
  }

  const currentState = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
  return Response.json(currentState);
}
