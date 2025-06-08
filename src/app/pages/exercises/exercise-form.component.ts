import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { SetEntry, WorkoutEntry } from '../../models/workout-entry.model';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit, OnDestroy{
  exerciseName = '';
  machineNumber = '';
  private backHandler: any;
  sets: SetEntry[] = [{ weight: 0, reps: 0 }];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exerciseName = this.route.snapshot.paramMap.get('exerciseName')?.replace(/-/g, ' ') || '';

    this.backHandler = CapacitorApp.addListener('backButton', () => {
      this.router.navigate(['/exercises', this.route.snapshot.paramMap.get('categoryName')]);
    });
  }
  ngOnDestroy(): void {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  get workoutImage(): string | null {
    if (!this.exerciseName) return null;
    const fileName = this.exerciseName.toLowerCase().replace(/\s+/g, '-');
    return `assets/workout-images/${fileName}.jpg`;
  }

  addSet() {
    if (this.sets.length < 4) {
      this.sets.push({ weight: 0, reps: 0 });
    } else {
      alert('Only 4 sets are allowed.');
    }
  }

  saveWorkout() {
    const newWorkout: WorkoutEntry = {
      exercise: this.exerciseName,
      machineNumber: this.machineNumber,
      sets: this.sets,
      date: new Date().toISOString()
    };
    this.workoutService.saveEntry(newWorkout);
    this.sets = [{ weight: 0, reps: 0 }];
    this.machineNumber = '';
    alert('Workout saved!');
  }

  getFormattedExerciseName(): string {
    return this.exerciseName.toLowerCase().replace(/\s+/g, '-');
  }

}
