import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  
  onMenuClick(): void {
    console.log('Overflow menu clicked!');
    // Later we can show a dropdown or Capacitor Action Sheet here
  }
}
