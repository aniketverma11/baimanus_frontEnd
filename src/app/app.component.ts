import { Component, OnInit } from '@angular/core';
import { ThemeService } from './common-components/layout/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'baimanus_frontend';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.themeService.isDarkMode()) {
      document.body.classList.add('dark-theme');
    }
  }
}
