export interface SetEntry {
  weight: number;
  reps: number;
}

export interface WorkoutEntry {
  exercise: string;
  machineNumber?: string;   // Optional field
  machineImage?: string;    // Optional: URL or base64 image string
  sets: SetEntry[];
  date: string;
}