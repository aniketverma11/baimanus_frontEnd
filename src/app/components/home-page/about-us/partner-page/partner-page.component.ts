import { Component } from '@angular/core';

@Component({
  selector: 'app-partner-page',
  templateUrl: './partner-page.component.html',
  styleUrl: './partner-page.component.css',
})
export class PartnerPageComponent {
  type: any;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
  }

  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
}
