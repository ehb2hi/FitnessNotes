export interface SetEntry {
  weight: number;
  reps: number;
}

export interface WorkoutEntry {
  exercise: string;
  sets: SetEntry[];
  date: string; // ISO string for simplicity
}
