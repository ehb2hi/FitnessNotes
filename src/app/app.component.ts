import { Component } from '@angular/core';
import { 
  RouterOutlet, 
  Router,   
  RouterLink,
  RouterLinkActive    
} from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FitnessNotes';
  constructor(private router: Router) {}

  ngOnInit(): void {
      const savedTheme = localStorage.getItem('appTheme');
      
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.add('light-theme');
    }

    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back(); // Use Angular history
      } else {
        CapacitorApp.exitApp(); // Exit app if no history
      }
    });
  }
}
