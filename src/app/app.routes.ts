import { Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { CategoryListComponent } from './pages/categories/category-list.component';
import { ExerciseListComponent } from './pages/exercises/exercise-list.component';
import { ExerciseFormComponent } from './pages/exercises/exercise-form.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryListComponent },
  { path: 'exercises/:categoryName', component: ExerciseListComponent },
  { path: 'exercise/:exerciseName', component: ExerciseFormComponent },
  { path: 'exercise-history/:exerciseName', component: HistoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: HistoryComponent }
];
