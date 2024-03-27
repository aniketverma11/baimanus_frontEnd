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
    console.log(footer);

    const header = document.getElementById('header');
    console.log(header, 'header=====>');

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
