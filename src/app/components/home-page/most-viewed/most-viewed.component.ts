import { Component, Input } from '@angular/core';
import { LanguageChangeServiceService } from '../../../../services/language-change-service.service';
import { LanguageService } from '../../../../services/language.service';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrl: './most-viewed.component.css',
})
export class MostViewedComponent {
  @Input() content_type: any;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeInfoSlug: any;
  darkMode: boolean;
  type: any;
  content: any;
  constructor(
    private apiService: ApiServicesService,

    private router: Router,
    private themeService: ThemeService,
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

    this.getMostViewdData();
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
  getMostViewdData() {
    this.isLoading = true;

    this.unsubscribe.add(
      this.apiService.getMostViewd(this.type, this.content_type).subscribe(
        (data) => {
          this.content = data.data;
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }
  getHomeContentBySlug(slug: any, category: any, categoryName: string) {
    console.log(categoryName);

    this.router.navigate(['home/news-details'], {
      queryParams: {
        slug: slug,
        category: category,
        categoryName: categoryName,
      },
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
