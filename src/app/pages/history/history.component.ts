import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { WorkoutService } from '../../services/workout.service';
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


  constructor(private workoutService: WorkoutService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filterExercise = this.route.snapshot.paramMap.get('exerciseName')?.replace(/-/g, ' ') || '';

    const all = this.workoutService.getAllEntries();
    this.workouts = this.filterExercise
      ? all.filter(w => w.exercise.toLowerCase() === this.filterExercise?.toLowerCase())
      : all;
      
    console.log('Filter exercise:', this.filterExercise);
    console.log('Saved exercises:', all.map(w => w.exercise));
  }

  deleteWorkout(index: number): void {
    if (confirm('Are you sure you want to delete this workout?')) {
      this.workoutService.deleteEntry(index);
      this.workouts = this.workoutService.getAllEntries(); // refresh list
    }
  }

  startEdit(index: number): void {
    this.editIndex = index;
  }

  saveEdit(index: number): void {
    const updatedWorkout = this.workouts[index];
    const all = this.workoutService.getAllEntries();
    all[index] = updatedWorkout;
    localStorage.setItem('workoutEntries', JSON.stringify(all));
    this.editIndex = null;
  }

  getImageForWorkout(exercise: string): string {
    const fileName = exercise.toLowerCase().replace(/\s+/g, '-');
    return `assets/workout-images/${fileName}.jpg`;
  }
}
