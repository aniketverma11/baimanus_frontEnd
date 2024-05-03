import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../../../services/api-services.service';
import { environment } from '../../../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../common-components/layout/theme.service';
import { CategoryService } from '../../../../../../services/category.service';
import { LanguageService } from '../../../../../../services/language.service';
import { LanguageChangeServiceService } from '../../../../../../services/language-change-service.service';

@Component({
  selector: 'app-all-dhartri-videos',
  templateUrl: './all-dhartri-videos.component.html',
  styleUrl: './all-dhartri-videos.component.css',
})
export class AllDhartriVideosComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  darkMode: boolean;
  isLoading: boolean = false;
  type: string = 'dhariti';
  homePhotos: any;
  VideoObject: any;
  constructor(
    private apiService: ApiServicesService,
    private router: Router,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private LanguageChangeService: LanguageChangeServiceService
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    this.getHomeVideos();
  }
  navigate(slug: any) {
    this.router.navigate(['home/dharitries-videos'], {
      queryParams: { slug: slug },
    });
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
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getViideos(this.type).subscribe(
        (res) => {
          this.isLoading = false;
          this.VideoObject = res.data;
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }
  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
