// import { EventEmitter, Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class ThemeService {
//   private darkMode = false;
//   darkModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

//   toggleDarkMode(): void {
//     this.darkMode = !this.darkMode;
//     this.applyTheme();
//     this.applyFooterTheme();
//     this.applyHTheme();
//     this.darkModeChanged.emit(this.darkMode);
//   }

//   private applyTheme(): void {
//     document.body.classList.toggle('dark-theme', this.darkMode);
//   }

//   private applyFooterTheme(): void {
//     const footer = document.getElementById('footer');
//     console.log(footer);

//     const header = document.getElementById('header');

//     if (footer) {
//       footer.classList.toggle('dark-theme', this.darkMode);
//     }

//     if (header) {
//       header.classList.toggle('dark-theme', this.darkMode);
//     }
//   }

//   applyHTheme(): void {
//     const headings = document.querySelectorAll('h1, h2, h3, h4');

//     if (headings) {
//       headings.forEach((element) => {
//         element.classList.toggle('white-color', !this.darkMode);
//         element.classList.toggle('yellow-color', this.darkMode);
//       });
//     }
//   }

//   isDarkMode(): boolean {
//     return this.darkMode;
//   }
// }
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeKey = 'darkMode'; // Define the key for storing dark mode preference
  private darkMode = false;
  darkModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    // Check if localStorage is available before retrieving dark mode preference
    if (typeof localStorage !== 'undefined') {
      const storedDarkMode = localStorage.getItem(this.darkModeKey);
      if (storedDarkMode !== null) {
        this.darkMode = JSON.parse(storedDarkMode);
        this.applyTheme();
        this.applyFooterTheme();
        this.applyHTheme();
      }
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    this.applyFooterTheme();
    this.applyHTheme();
    this.darkModeChanged.emit(this.darkMode);

    // Store dark mode preference in local storage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.darkModeKey, JSON.stringify(this.darkMode));
    }
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  private applyFooterTheme(): void {
    const footer = document.getElementById('footer');
    const header = document.getElementById('header');

    if (footer) {
      footer.classList.toggle('dark-theme', this.darkMode);
    }

    if (header) {
      header.classList.toggle('dark-theme', this.darkMode);
    }
  }

  applyHTheme(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4');

    if (headings) {
      headings.forEach((element) => {
        element.classList.toggle('white-color', !this.darkMode);
        element.classList.toggle('yellow-color', this.darkMode);
      });
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}
