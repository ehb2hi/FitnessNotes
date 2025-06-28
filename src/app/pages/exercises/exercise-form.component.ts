import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { WorkoutService } from '../../services/workout.service';
import { WorkoutDatabaseService } from '../../services/workout-database.service';
import { SetEntry, WorkoutEntry } from '../../models/workout-entry.model';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
// import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFormComponent implements OnInit, OnDestroy{
  exerciseName = '';
  machineNumber = '';
  private backHandler: any;
  sets: SetEntry[] = [{ weight: 0, reps: 0 }];

  constructor(
    private route: ActivatedRoute,
    // private workoutService: WorkoutService,
    private workoutDb: WorkoutDatabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.workoutDb.initDB(); 

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
    return `assets/workout-images/${fileName}.png`;
  }

  addSet() {
    if (this.sets.length < 4) {
      this.sets.push({ weight: 0, reps: 0 });
    } else {
      alert('Only 4 sets are allowed.');
    }
  }

  async saveWorkout() {
    const newWorkout: WorkoutEntry = {
      exercise: this.exerciseName,
      machineNumber: this.machineNumber,
      sets: this.sets,
      date: new Date().toISOString()
    };
    await this.workoutDb.insertWorkout(newWorkout);
    this.sets = [{ weight: 0, reps: 0 }];
    this.machineNumber = '';
    alert('Workout saved!');
  }

  getFormattedExerciseName(): string {
    return this.exerciseName.toLowerCase().replace(/\s+/g, '-');
  }

}
