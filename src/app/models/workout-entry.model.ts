export interface SetEntry {
  weight: number;
  reps: number;
}

export interface WorkoutEntry {
  exercise: string;
  machineNumber?: string;   // Optional field
  sets: SetEntry[];
  date: string;
}