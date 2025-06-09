export interface SetEntry {
  weight: number;
  reps: number;
}

export interface WorkoutEntry {
  id?: number;               // Optional → for new workouts not yet saved
  exercise: string;
  machineNumber?: string;    // Optional field
  sets: SetEntry[];
  date: string;
}
