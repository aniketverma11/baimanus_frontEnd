import { Component } from '@angular/core';
import { environment } from '../../../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { ApiServicesService } from '../../../../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../common-components/layout/theme.service';

@Component({
  selector: 'app-home-page-videos',
  templateUrl: './home-page-videos.component.html',
  styleUrl: './home-page-videos.component.css',
})
export class HomePageVideosComponent {
  conent_type = 'videos';
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  darkMode: boolean = false;
  type: any;
  VideoObject: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }

    this.themeService.darkModeChanged.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    });
    this.getHomeVideos();
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
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
          this.VideoObject = res.data;
          console.log(this.VideoObject);
          // this.VideoTitle = res.data.slice(1).map((item: any) => item);

          // this.videoImages = res.data.slice(0).map((item: any) => item.image);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  navigateVideos(slug: any) {
    this.router.navigate(['home/videos'], {
      queryParams: { slug: slug },
    });
  }
  getFullImagePath(relativePath: string): string {
    console.log(relativePath);

    return `${this.imageBaseURL}${relativePath}`;
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
