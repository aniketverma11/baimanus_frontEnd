import { Component } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // In your component.ts
  sectionData = ['Section Value 1', 'Section Value 2', 'Section Value 3'];
  trendingData = ['Trending Value 1', 'Trending Value 2', 'Trending Value 3'];
  infoData = ['Info Value 1', 'Info Value 2', 'Info Value 3'];
  isLoading: boolean = false;
  categoryList: any;
  private unsubscribe: Subscription = new Subscription();
  type: any;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
    this.getAllCategories();
  }
  getAllCategories() {
    if (!this.type) {
      this.type = 'english';
    }
    this.isLoading = true;
    this.unsubscribe.add(
      this.categoryService.getFourCategories(this.type).subscribe(
        (data) => {
          this.isLoading = false;

          this.categoryList = data.data;
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

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
