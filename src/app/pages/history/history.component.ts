import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { WorkoutService } from '../../services/workout.service';
import { WorkoutEntry } from '../../models/workout-entry.model';

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


  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getAllEntries();
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
}
