import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../../../services/api-services.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../common-components/layout/theme.service';
import { CategoryService } from '../../../../../../services/category.service';
import { LanguageService } from '../../../../../../services/language.service';
import { LanguageChangeServiceService } from '../../../../../../services/language-change-service.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../enviroments/environment';

@Component({
  selector: 'app-all-photos-listing',
  templateUrl: './all-photos-listing.component.html',
  styleUrl: './all-photos-listing.component.css',
})
export class AllPhotosListingComponent {
  conent_type = 'photos';
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  darkMode: boolean;
  isLoading: boolean = false;
  type: any;
  homePhotos: any;
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
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
    this.getHomePhotos();
  }
  navigate(slug: any) {
    this.router.navigate(['home/photos'], {
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
  getHomePhotos() {
    if (!this.type) {
      this.type = 'english';
    }

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos(this.type).subscribe(
        (data) => {
          console.log(data);

          this.isLoading = false;
          this.homePhotos = data.data;
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
