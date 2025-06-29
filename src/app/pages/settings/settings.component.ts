import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  /** UI state */
  followSystem = true;          // NEW
  isDarkTheme = false;

  /** MediaQuery for system theme */
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  ngOnInit(): void {
    const saved = localStorage.getItem('appTheme'); // 'system' | 'light' | 'dark' | null

    // 1. restore preference
    if (saved === 'light') {
      this.followSystem = false;
      this.isDarkTheme = false;
    } else if (saved === 'dark') {
      this.followSystem = false;
      this.isDarkTheme = true;
    } else {
      // default → follow system
      this.followSystem = true;
      this.isDarkTheme = this.mediaQuery.matches;
    }

    // 2. apply the theme now
    this.applyTheme();

    // 3. watch OS only if we follow it
    if (this.followSystem) {
      this.mediaQuery.addEventListener('change', e => {
        this.isDarkTheme = e.matches;
        this.applyTheme(false);    // no storage write
      });
    }
  }

  /** Toggle “Follow system” */
  toggleFollowSystem(): void {
    this.followSystem = !this.followSystem;

    if (this.followSystem) {
      this.isDarkTheme = this.mediaQuery.matches;
      localStorage.setItem('appTheme', 'system');
      this.applyTheme(false);      // already stored
      // start listener
      this.mediaQuery.addEventListener('change', this.handleSystemChange);
    } else {
      // stop listener
      this.mediaQuery.removeEventListener('change', this.handleSystemChange);
      this.applyTheme();           // writes explicit light/dark
    }
  }

  /** Manual dark-mode switch */
  toggleTheme(): void {
    if (this.followSystem) { return; }    // should be disabled anyway
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();                    // writes light/dark
  }

  /** Actually add/remove classes + optionally write localStorage */
  private applyTheme(writePref = true): void {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    document.body.classList.toggle('light-theme', !this.isDarkTheme);

    if (!writePref) { return; }
    if (this.followSystem) {
      localStorage.setItem('appTheme', 'system');
    } else {
      localStorage.setItem('appTheme', this.isDarkTheme ? 'dark' : 'light');
    }
  }

  /** Separate handler so we can remove it */
  private handleSystemChange = (e: MediaQueryListEvent) => {
    this.isDarkTheme = e.matches;
    this.applyTheme(false);
  };
}

