import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FitnessNotes';
  constructor(private router: Router) {}

  ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back(); // Use Angular history
      } else {
        CapacitorApp.exitApp(); // Exit app if no history
      }
    });
  }
}
