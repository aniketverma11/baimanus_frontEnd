import { Component } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  constructor(private apiService: ApiServicesService, private router: Router) {}

  ngOnInit() {
    this.getHomePhotos();
  }

  getHomePhotos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos().subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;
          console.log(this.homePhotos);
          // this.headingPhoto = this.homePhotos[0].content;
          // const srcRegex = /<img[^>]+src="([^">]+)"/;
          // const match = this.headingPhoto.match(srcRegex);
          // const src = match ? match[1] : null;
          // this.imagetitle = this.imageBaseURL + src;
          // console.log(this.imagetitle);

          // loop
          for (let i = 0; i < this.homePhotos.length; i++) {
            const srcRegex = /<img[^>]+src="([^">]+)"/;
            const match = this.homePhotos[i].content.match(srcRegex);
            const src = match ? match[1] : null;
            this.imagetitle = this.imageBaseURL + src;
            console.log(this.imagetitle);
          }

          // this.headingTitle = this.homePhotos
          //   .slice(0, 3)
          //   .map((item: any) => item.title);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getImageUrl(content: string): string {
    const srcRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(srcRegex);
    const src = match ? match[1] : null;
    return this.imageBaseURL + src;
  }
}
