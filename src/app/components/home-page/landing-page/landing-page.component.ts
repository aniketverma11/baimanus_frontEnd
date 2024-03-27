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
  providers: [ThemeService],
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
  homePhotosSlug: any;
  VideoObject: any;
  VideoTitle: any;
  videoImages: any;
  type: any;
  homeInfoSlug: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.type = localStorage.getItem('language');
    this.getHomeContent();
    this.getHomePhotos();
    this.getHomeVideos();
  }
  getHomePhotos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos().subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;
          this.homePhotosSlug = data.data[0].slug;

          this.headingPhoto = this.homePhotos[0]?.content;
          const srcRegex = /<img[^>]+src="([^">]+)"/;
          const match = this.headingPhoto.match(srcRegex);
          const src = match ? match[1] : null;
          this.imagetitle = this.imageBaseURL + src;

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
    console.log(this.type);

    this.unsubscribe.add(
      this.apiService.getHomeContent(this.type).subscribe(
        (data) => {
          this.homeInfo = data.data;
          this.belowContent = data.data;
          this.homeContent = data?.data[0];

          this.homeInfo = data.data.slice(0, 3).map((item: any) => item.title);
          this.homeInfoSlug = data.data
            .slice(0, 3)
            .map((item: any) => item.slug);

          this.readMoreItems = data.data.slice(0, 4).map((item: any) => item);
          console.log(this.readMoreItems);

          this.readMoreImages = data.data
            .slice(0, 4)
            .map((item: any) => item.image);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getHomeContentBySlug(slug: any) {
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
        (res) => {
          this.isLoading = false;
          this.VideoObject = res.data[0];
          this.VideoTitle = res.data.slice(0, 3).map((item: any) => item.title);
          this.videoImages = res.data
            .slice(0, 3)
            .map((item: any) => item.image);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  navigate(slug: any) {
    this.router.navigate(['home/photos'], {
      queryParams: { slug: slug },
    });
  }
  navigateVideos(slug: any) {
    this.router.navigate(['home/videos'], {
      queryParams: { slug: slug },
    });
  }
  get themeServiceInstance(): ThemeService {
    return this.themeService;
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
