import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.css',
})
export class NewsSectionComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getHomeContent();
  }
  // getHomeContent() {
  //   this.isLoading = true;
  //   this.unsubscribe.add(
  //     this.apiService.getHomeContent().subscribe(
  //       (data) => {
  //         this.homeContent = data.data;
  //         console.log(data);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     )
  //   );
  // }
}
