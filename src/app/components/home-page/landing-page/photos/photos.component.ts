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
  homePhotos: any;
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
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }
}
