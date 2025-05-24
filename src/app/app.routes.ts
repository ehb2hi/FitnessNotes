import { Routes } from '@angular/router';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'workouts', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'history', component: HistoryComponent }
];
