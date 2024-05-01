import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { LanguageService } from '../../../../services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageChangeServiceService } from '../../../../services/language-change-service.service';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrl: './category-listing.component.css',
})
export class CategoryListingComponent {
  conent_type = 'posts';
  darkMode: boolean;
  type: any;
  slug: any;
  categorySlug: any;
  isLoading: boolean = false;
  private unsubscribe: Subscription = new Subscription();
  categoryList: any;
  categoryListPosts: any;
  private imageBaseURL = environment.imagesBaseURL;
  categoryName: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private LanguageChangeService: LanguageChangeServiceService,
    private route: ActivatedRoute
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.themeService.darkModeChanged.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    });
    // getLangauge
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }

    this.route.queryParams.subscribe((params) => {
      console.log(params);

      this.slug = params['category'];
      console.log(this.slug);
      this.categoryName = params['name'];
      console.log('name===================');

      this.categorySlug = params['category'];

      if (this.slug) {
        this.getAllCategories(this.slug);
        // this.textSizeService.textSize$.subscribe((size) => {
        //   this.textSize = size;
        // });
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
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

  getHomeContentBySlug(slug: any, category: any, categoryName: string) {
    console.log(category);

    this.router.navigate(['home/news-details'], {
      queryParams: {
        slug: slug,
        category: category,
        categoryName: categoryName,
      },
    });
  }
  getAllCategories(category: any) {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.categoryarticles(category, this.type).subscribe(
        (data) => {
          console.log(data);

          this.isLoading = false;

          this.categoryList = data.data;
          console.log(this.categoryList);

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
  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
