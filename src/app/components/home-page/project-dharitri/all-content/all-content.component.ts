import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../common-components/layout/theme.service';
import { CategoryService } from '../../../../../services/category.service';
import { LanguageService } from '../../../../../services/language.service';
import { LanguageChangeServiceService } from '../../../../../services/language-change-service.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';

@Component({
  selector: 'app-all-content',
  templateUrl: './all-content.component.html',
  styleUrl: './all-content.component.css',
})
export class AllContentComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  darkMode: boolean;
  isLoading: boolean = false;
  type: string = 'dhariti';
  homePhotos: any;
  VideoObject: any;
  homeContent: any;
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
    this.getHomeContent();
  }
  navigate(slug: any) {
    this.router.navigate(['home/dharitries-details'], {
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
  getHomeContent() {
    this.isLoading = true;

    this.unsubscribe.add(
      this.apiService.getHomeContent(this.type).subscribe(
        (data) => {
          // this.homeInfo = data.data;
          this.homeContent = data?.data;
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
