import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutEntry, SetEntry } from '../../models/workout-entry.model';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent {
  exercises = ['Bench Press', 'Leg Curl', 'Lat Pulldown', 'Squat', 'Lat Press Back'];
  selectedExercise = this.exercises[0];
  sets: SetEntry[] = [{ weight: 0, reps: 0 }];
  machineNumber = '';


  constructor(private workoutService: WorkoutService) {}

  addSet() {
    if (this.sets.length < 4) {
      this.sets.push({ weight: 0, reps: 0 });
    } else {
      alert('Only 4 sets are allowed.');
    }
  }


  saveWorkout() {
    const newWorkout: WorkoutEntry = {
      exercise: this.selectedExercise,
      machineNumber: this.machineNumber,
      sets: this.sets,
      date: new Date().toISOString()
    };
    this.workoutService.saveEntry(newWorkout);
    this.sets = [{ weight: 0, reps: 0 }]; // reset form
    this.machineNumber = '';    
    alert('Workout saved!');
  }

  get workoutImage(): string | null {
    if (!this.selectedExercise) return null;
    const fileName = this.selectedExercise.toLowerCase().replace(/\s+/g, '-');
    console.log('Selected image:',fileName);
    return `assets/workout-images/${fileName}.jpg`;
  }

  
}
