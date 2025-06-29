import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CATEGORIES } from '../../models/categories';
import { MatRippleModule } from '@angular/material/core';


@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatRippleModule],
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {
  categoryName = '';
  exercises: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName') || '';
    const category = CATEGORIES.find(
      c => c.name.toLowerCase() === this.categoryName.toLowerCase()
    );
    this.exercises = category?.exercises || [];
  }

  formatExerciseLink(exercise: string): string {
    return exercise.toLowerCase().replace(/\s+/g, '-');
  }
}
