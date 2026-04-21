import fs from 'fs';
import path from 'path';

const stateFilePath = path.join(process.cwd(), 'simulator-state.json');

export type HomeState = {
  status: 'safe' | 'panic' | 'inactive';
  lights: 'harsh_white' | 'amber';
  door: 'locked' | 'unlocked';
};

const defaultState: HomeState = {
  status: 'safe',
  lights: 'harsh_white',
  door: 'locked'
};

export function getState(): HomeState {
  try {
    if (!fs.existsSync(stateFilePath)) {
      return defaultState;
    }
    const fileContent = fs.readFileSync(stateFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return defaultState;
  }
}

export function updateState(newState: Partial<HomeState>): HomeState {
  const current = getState();
  const updated = { ...current, ...newState };
  fs.writeFileSync(stateFilePath, JSON.stringify(updated, null, 2));
  return updated;
}
