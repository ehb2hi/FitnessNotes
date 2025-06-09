import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { WorkoutEntry, SetEntry } from '../models/workout-entry.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDB(): Promise<void> {
    
    if (Capacitor.getPlatform() === 'web') {
      console.warn('Skipping initDB on web platform');
      return;
    }

    try {
      this.db = await this.sqlite.createConnection('fitnessNotesDB', false, 'no-encryption', 1, false);
      await this.db.open();

      const createTable = `
        CREATE TABLE IF NOT EXISTS workouts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          exercise TEXT NOT NULL,
          machineNumber TEXT,
          sets TEXT,
          date TEXT NOT NULL
        );
      `;

      await this.db.execute(createTable);
    } catch (err) {
      console.error('Error initializing database:', err);
    }
  }

  async insertWorkout(entry: WorkoutEntry): Promise<void> {
    console.log('Inserted workout:', entry);
    if (!this.db) {
      await this.initDB();
    }

    const setsJson = JSON.stringify(entry.sets);

    const stmt = `
      INSERT INTO workouts (exercise, machineNumber, sets, date)
      VALUES (?, ?, ?, ?);
    `;

    await this.db?.run(stmt, [
      entry.exercise,
      entry.machineNumber ?? '',
      setsJson,
      entry.date,
    ]);
  }

  async getAllWorkouts(): Promise<WorkoutEntry[]> {
    if (!this.db) {
      await this.initDB();
    }

    const stmt = `SELECT * FROM workouts ORDER BY date DESC;`;

    const result = await this.db?.query(stmt);
    console.log('getAllWorkouts raw result:', result?.values);

    return result?.values?.map((row: any) => ({
      id: row.id,
      exercise: row.exercise,
      machineNumber: row.machineNumber,
      sets: JSON.parse(row.sets) as SetEntry[],
      date: row.date,
    })) ?? [];
  }

  async getWorkoutsByExercise(exerciseName: string): Promise<WorkoutEntry[]> {
    if (!this.db) {
      await this.initDB();
    }

    const stmt = `SELECT * FROM workouts WHERE LOWER(exercise) = LOWER(?) ORDER BY date DESC;`;

    const result = await this.db?.query(stmt, [exerciseName]);

    return result?.values?.map((row: any) => ({
      id: row.id,
      exercise: row.exercise,
      machineNumber: row.machineNumber,
      sets: JSON.parse(row.sets) as SetEntry[],
      date: row.date,
    })) ?? [];
  }

  async deleteWorkoutById(id: number): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    const stmt = `DELETE FROM workouts WHERE id = ?;`;

    await this.db?.run(stmt, [id]);
  }

  async updateWorkout(entry: WorkoutEntry): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    if (!entry.id) {
      throw new Error('Workout ID is required for update.');
    }

    const setsJson = JSON.stringify(entry.sets);

    const stmt = `
      UPDATE workouts
      SET exercise = ?, machineNumber = ?, sets = ?, date = ?
      WHERE id = ?;
    `;

    await this.db?.run(stmt, [
      entry.exercise,
      entry.machineNumber ?? '',
      setsJson,
      entry.date,
      entry.id,
    ]);
  }
}
