import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription, catchError } from 'rxjs';
import { environment } from '../../../../../enviroments/environment';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent implements AfterViewInit {
  private imageBaseURL = environment.imagesBaseURL;
  slug: string | null = '';
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  homeInfo: any;
  belowContent: any;
  private unsubscribe: Subscription = new Subscription();
  content: any;
  newsDetails: any;
  images: string = '';
  showFullContent: boolean = false;
  @ViewChild('contentContainer') contentContainer!: ElementRef;
  readMoreItems: any;
  readMoreImages: any;
  trendingNews: any;
  readMoreItemsDetail: any;
  readMoreImagesDetail: any;

  constructor(
    private route: ActivatedRoute,

    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private renderer: Renderer2
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

    this.getHomeContent();
  }
  ngAfterViewInit(): void {
    this.addStylesToImages();
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
          console.log(data);

          this.isLoading = false;
          if (data.data.is_for_members === false) {
            this.content = this.sanitizer.bypassSecurityTrustHtml(
              data.data.content
            );
            if (data) {
              this.newsDetails = data.data;
              this.images = this.imageBaseURL;
              this.trendingNews = data.data.treanding_news;
              this.readMoreItemsDetail = data.data.read_more
                .slice(0, 4)
                .map((item: any) => item.title);
              this.readMoreImagesDetail = data.data.read_more
                .slice(0, 4)
                .map((item: any) => item.image);
              console.log(this.trendingNews);
            }
          }
          if (data.data.is_for_members === true) {
            console.log('member only ');
            this.content = this.sanitizer.bypassSecurityTrustHtml(
              data.data.content
            );
            if (data) {
              this.newsDetails = data.data;
              this.images = this.imageBaseURL;
            }
          }
        })
    );
  }

  getDynamicStyles(): Object {
    return {
      'font-family': 'Arial, sans-serif',
      color: '#333',
      'bacground-color': 'aqua',
    };
  }

  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }
  private addStylesToImages() {
    if (this.contentContainer) {
      const imgElements =
        this.contentContainer.nativeElement.querySelectorAll('img');
      imgElements.forEach((img: any) => {
        this.renderer.setStyle(img, 'max-width', '100%');
        this.renderer.setStyle(img, 'border', '5px solid red');
        this.renderer.setStyle(img, 'height', '200px');
      });
      // add stule to p
      const paragraph =
        this.contentContainer.nativeElement.querySelectorAll('p');
      paragraph.forEach((p: any) => {
        this.renderer.setStyle(p, 'border', '3px solid green');
      });
    }
  }

  // get content
  getHomeContent() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getHomeContent().subscribe(
        (data) => {
          console.log(data);

          this.homeInfo = data.data;
          this.belowContent = data.data;
          this.homeContent = data?.data[0];

          this.homeInfo = data.data.slice(0, 3).map((item: any) => item.title);
          this.readMoreItems = data.data
            .slice(0, 4)
            .map((item: any) => item.title);
          this.readMoreImages = data.data
            .slice(0, 4)
            .map((item: any) => item.image);

          console.log(this.homeInfo);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  truncateHtmlContent(content: string): SafeHtml {
    const words = content.split(' ');

    const truncatedWords = words.slice(0, 70);

    const truncatedContent = truncatedWords.join(' ');

    return this.sanitizer.bypassSecurityTrustHtml(truncatedContent);
  }

  toggleExpanded(newsItem: any): void {
    newsItem.expanded = !newsItem.expanded;
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
