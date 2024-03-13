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
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getHomeContent();
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
          this.headingPhoto = this.homeContent[0].content;
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
          this.homeContent = data.data;
          console.log(data);
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
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
