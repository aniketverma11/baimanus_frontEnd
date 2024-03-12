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
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getHomeContent();
  }

  getHomeContent() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getHomeContent().subscribe(
        (data) => {
          // this.isLoading = false;
          this.homeContent = data.data;
          console.log(data);
          // this.cmsPage = this.sanitizer.bypassSecurityTrustHtml(footerContent.content);
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

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
