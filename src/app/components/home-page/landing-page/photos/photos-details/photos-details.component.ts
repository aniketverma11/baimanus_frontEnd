import { Component, Input } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';

@Component({
  selector: 'app-photos-details',
  templateUrl: './photos-details.component.html',
  styleUrl: './photos-details.component.css',
})
export class PhotosDetailsComponent {
  private imageBaseURL = environment.imagesBaseURL;
  @Input() photos: any;
  currentIndex = 0;

  constructor() {
    console.log(this.photos);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex + this.photos.length - 1) % this.photos.length;
  }
  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }
}
