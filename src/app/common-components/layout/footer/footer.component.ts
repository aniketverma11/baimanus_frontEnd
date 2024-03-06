import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // In your component.ts
  sectionData = ['Section Value 1', 'Section Value 2', 'Section Value 3'];
  trendingData = ['Trending Value 1', 'Trending Value 2', 'Trending Value 3'];
  infoData = ['Info Value 1', 'Info Value 2', 'Info Value 3'];
}
