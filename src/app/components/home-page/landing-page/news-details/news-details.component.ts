import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, catchError } from 'rxjs';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent {
  slug: string | null = '';
  isLoading: boolean = false;
  private unsubscribe: Subscription = new Subscription();
  content: any;

  constructor(
    private route: ActivatedRoute,

    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.slug = params['slug'];

      console.log(this.slug);
      if (this.slug) {
        this.getHomeContentBySlug(this.slug);
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
    });
  }

  getHomeContentBySlug(slug: any) {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService
        .getHomeContentBySlug(slug)
        .pipe(
          catchError((error) => {
            console.error('API Error:', error);
            this.isLoading = false;
            return [];
          })
        )
        .subscribe((data) => {
          this.isLoading = false;

          this.content = this.sanitizer.bypassSecurityTrustHtml(
            data.data.content
          );
        })
    );
  }

  getDynamicStyles(): Object {
    return {
      'font-family': 'Arial, sans-serif',
      color: '#333',
      'bacground-color': 'aqua',
      ' max-width': ' 1280px',
      margin: 'auto',
      'padding-left': '20px',
      ' padding-right': '20px',
    };
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
