import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    this.applyFooterTheme();
    this.applyHTheme();
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
    const h3Elements = document.querySelectorAll('h3');

    if (h3Elements) {
      h3Elements.forEach((element) => {
        element.classList.toggle('white-color', !this.darkMode);
      });
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}
