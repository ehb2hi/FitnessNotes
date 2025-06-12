import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutDatabaseService } from '../../services/workout-database.service';
import { WorkoutEntry } from '../../models/workout-entry.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  workouts: WorkoutEntry[] = [];
  editIndex: number | null = null;
  filterExercise: string | null = null;

  constructor(
    private workoutDb: WorkoutDatabaseService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.workoutDb.initDB(); 

    this.filterExercise = this.route.snapshot.paramMap.get('exerciseName')?.replace(/-/g, ' ') || '';

    console.log('Filter exercise:', this.filterExercise);

    if (this.filterExercise) {
      this.workouts = await this.workoutDb.getWorkoutsByExercise(this.filterExercise);
    } else {
      this.workouts = await this.workoutDb.getAllWorkouts();
    }
    console.log('HistoryComponent workouts:', this.workouts);

    console.log('Saved exercises:', this.workouts.map(w => w.exercise));
  }

  async deleteWorkout(index: number): Promise<void> {
    if (confirm('Are you sure you want to delete this workout?')) {
      const workout = this.workouts[index];
      if (!workout.id) {
        alert('Error: Workout has no ID and cannot be deleted!');
        return;
      }

      await this.workoutDb.deleteWorkoutById(workout.id);

      // Refresh list:
      if (this.filterExercise) {
        this.workouts = await this.workoutDb.getWorkoutsByExercise(this.filterExercise);
      } else {
        this.workouts = await this.workoutDb.getAllWorkouts();
      }
    }
  }

  startEdit(index: number): void {
    this.editIndex = index;
  }

  async saveEdit(index: number): Promise<void> {
    const workout = this.workouts[index];
    if (!workout.id) {
      alert('Error: Workout has no ID and cannot be updated!');
      return;
    }

    await this.workoutDb.updateWorkout(workout);

    this.editIndex = null;

    // Optional: Refresh list
    if (this.filterExercise) {
      this.workouts = await this.workoutDb.getWorkoutsByExercise(this.filterExercise);
    } else {
      this.workouts = await this.workoutDb.getAllWorkouts();
    }

    alert('Workout updated!');
  }

  getImageForWorkout(exercise: string): string {
    const fileName = exercise.toLowerCase().replace(/\s+/g, '-');
    return `assets/workout-images/${fileName}.jpg`;
  }
}
