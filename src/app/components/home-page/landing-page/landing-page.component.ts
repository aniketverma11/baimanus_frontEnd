import { Component } from '@angular/core';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription, catchError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../enviroments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  homeInfo: any;
  belowContent: any;
  readMoreItems: any;
  readMoreImages: any;
  readMoreSlug: any;
  homePhotosSlug: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getHomeContent();
    this.getHomePhotos();
    // this.getHomeVideos();
  }
  getHomePhotos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos().subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;
          this.homePhotosSlug = data.data[0].slug;
          console.log(this.homePhotosSlug);

          console.log(this.homePhotos);
          this.headingPhoto = this.homePhotos[0]?.content;
          const srcRegex = /<img[^>]+src="([^">]+)"/;
          const match = this.headingPhoto.match(srcRegex);
          const src = match ? match[1] : null;
          this.imagetitle = this.imageBaseURL + src;
          console.log(this.imagetitle);

          this.headingTitle = this.homePhotos
            .slice(0, 3)
            .map((item: any) => item.title);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getHomeContent() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getHomeContent().subscribe(
        (data) => {
          console.log(data);

          this.homeInfo = data.data;
          this.belowContent = data.data;
          this.homeContent = data?.data[0];
          this.readMoreSlug = data.data
            .slice(0, 4)
            .map((item: any) => item.slug);
          console.log(this.readMoreSlug);

          this.homeInfo = data.data.slice(0, 3).map((item: any) => item.title);
          this.readMoreItems = data.data
            .slice(0, 4)
            .map((item: any) => item.title);
          this.readMoreImages = data.data
            .slice(0, 4)
            .map((item: any) => item.image);

          console.log(this.homeInfo);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getHomeContentBySlug(slug: any) {
    console.log(slug);

    this.router.navigate(['home/news-details'], {
      queryParams: { slug: slug },
    });
  }

  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }

  getSanitizedContent(): any {
    if (this.headingPhoto) {
      // Replace the image source with the base URL
      const sanitizedContent = this.headingPhoto.replace(
        /src="\/media/g,
        `src="${this.imageBaseURL}/media`
      );

      // Use DomSanitizer to sanitize the HTML content
      return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
    }
  }

  getHomeVideos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getViideos().subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;
          console.log(this.homePhotos);
          this.headingPhoto = this.homePhotos[0].content;
          const srcRegex = /<img[^>]+src="([^">]+)"/;
          const match = this.headingPhoto.match(srcRegex);
          const src = match ? match[1] : null;
          this.imagetitle = this.imageBaseURL + src;
          console.log(this.imagetitle);

          this.headingTitle = this.homePhotos
            .slice(0, 3)
            .map((item: any) => item.title);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }
  navigate(slug: any) {
    console.log(slug);

    this.router.navigate(['home/photos'], {
      queryParams: { slug: slug },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
