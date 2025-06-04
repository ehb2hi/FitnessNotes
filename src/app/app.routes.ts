import { Routes } from '@angular/router';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { HistoryComponent } from './pages/history/history.component';
import { CategoryListComponent } from './pages/categories/category-list.component';
import { ExerciseListComponent } from './pages/exercises/exercise-list.component';
import { ExerciseFormComponent } from './pages/exercises/exercise-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'workouts', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'exercises/:categoryName', component: ExerciseListComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'exercise/:exerciseName', component: ExerciseFormComponent },
  { path: 'exercise-history/:exerciseName', component: HistoryComponent },
  { path: 'history', component: HistoryComponent }
];
