import { Component } from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent {
  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  trendingNews: any;
  readMoreItemsDetail: any;
  readMoreImagesDetail: any;
  readMoreItems: any;
  readMoreImages: any;
  readMoreSlug: any;
  slug: any;
  allImages: any;
  constructor(
    private apiService: ApiServicesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.slug = params['slug'];

      console.log(this.slug);
      if (this.slug) {
        this.getHomePhotos(this.slug);
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {}

  getHomePhotos(slug: string) {
    slug = 'test';
    console.log(slug);

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotosDetails(slug).subscribe(
        (data) => {
          console.log('data', data);

          this.isLoading = false;
          this.homePhotos = data.data;

          this.trendingNews = data.data.treanding_news;
          console.log(this.trendingNews);

          this.readMoreItemsDetail = data.data.read_more.map(
            (item: any) => item.title
          );

          this.readMoreImagesDetail = data.data.read_more.flatMap((item: any) =>
            item.images.map((imageItem: any) => imageItem.image)
          );
          console.log(this.readMoreImagesDetail);

          this.readMoreItems = data.data.read_more.map(
            (item: any) => item.title
          );
          console.log(this.readMoreItems);
          this.readMoreImages = data.data.read_more.flatMap((item: any) =>
            item.images.map((imageItem: any) => imageItem.image)
          );
          console.log(this.readMoreImages);

          this.readMoreSlug = data.data.read_more
            .slice(0, 4)
            .map((item: any) => item.slug);
          console.log(this.readMoreSlug);

          // loop
          for (let i = 0; i < this.homePhotos.length; i++) {
            const srcRegex = /<img[^>]+src="([^">]+)"/;
            const match = this.homePhotos[i].content.match(srcRegex);
            const src = match ? match[1] : null;
            this.imagetitle = this.imageBaseURL + src;
            console.log(this.imagetitle);
          }

          // this.headingTitle = this.homePhotos
          //   .slice(0, 3)
          //   .map((item: any) => item.title);
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
  truncateHtmlContent(content: string): SafeHtml {
    const words = content.split(' ');

    const truncatedWords = words.slice(0, 70);

    const truncatedContent = truncatedWords.join(' ');

    return this.sanitizer.bypassSecurityTrustHtml(truncatedContent);
  }
  toggleExpanded(newsItem: any): void {
    newsItem.expanded = !newsItem.expanded;
  }
  getHomeContentBySlugAndNavigate(slug: any) {
    console.log(slug);

    this.router.navigate(['home/photos'], {
      queryParams: { slug: slug },
    });
  }
  getImageUrl(content: string): string {
    const srcRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(srcRegex);
    const src = match ? match[1] : null;
    return this.imageBaseURL + src;
  }
}
