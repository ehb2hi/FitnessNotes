import { Injectable } from '@angular/core';
import { WorkoutEntry } from '../models/workout-entry.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workoutEntries';

  constructor() {}

  getAllEntries(): WorkoutEntry[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveEntry(entry: WorkoutEntry): void {
    const all = this.getAllEntries();
    all.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }

  getEntriesByExercise(exercise: string): WorkoutEntry[] {
    return this.getAllEntries().filter(e => e.exercise === exercise);
  }

  deleteEntry(index: number): void {
    const all = this.getAllEntries();
    all.splice(index, 1); // Remove 1 item at the given index
    localStorage.setItem(this.storageKey, JSON.stringify(all));
  }
}
