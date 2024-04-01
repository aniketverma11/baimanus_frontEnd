import { Component } from '@angular/core';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription, catchError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../enviroments/environment';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { LanguageService } from '../../../../services/language.service';
import { LanguageChangeServiceService } from '../../../../services/language-change-service.service';

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
  darkMode: boolean;
  categoryList: any;
  categoryListPosts: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private LanguageChangeService: LanguageChangeServiceService
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }

    this.themeService.darkModeChanged.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    });

    this.getHomeContent();
    this.getHomePhotos();
    this.getHomeVideos();
    this.getAllCategories();
  }
  getHomePhotos() {
    if (!this.type) {
      this.type = 'english';
    }

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos(this.type).subscribe(
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
            .map((item: any) => item);
          console.log(this.headingTitle);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getHomeContent() {
    this.isLoading = true;

    if (!this.type) {
      this.type = 'english';
    }

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

          this.readMoreItems = data.data.slice(0, 3).map((item: any) => item);

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
    if (!this.type) {
      this.type = 'english';
    }

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getViideos(this.type).subscribe(
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

  getAllCategories() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.categoryService.getFourCategories(this.type).subscribe(
        (data) => {
          this.isLoading = false;

          this.categoryList = data.data;

          this.categoryListPosts = this.categoryList.map(
            (item: any) => item.posts
          );
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  async getLandingPageCategoryDetails(
    slug: string,
    index: number
  ): Promise<string> {
    try {
      this.isLoading = true;
      const res = await this.categoryService
        .getFourCategories(this.type)
        .toPromise();
      this.isLoading = false;
      return res.data.title;
    } catch (error) {
      console.error(error);
      return ''; // or handle error as needed
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
