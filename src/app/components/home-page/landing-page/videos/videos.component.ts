import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { environment } from '../../../../../enviroments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  slug: any;
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
  allImages: any;
  videoUrl: SafeResourceUrl = '';
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
        this.getHomeVideos(this.slug);
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {}

  getHomeVideos(slug: string) {
    // slug = 'test';
    console.log(slug);

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getVideosDetails(slug).subscribe(
        (data) => {
          console.log('data', data);

          this.isLoading = false;
          this.homePhotos = data.data;
          const videoUrl = data.data.video;
          const videoId = this.extractVideoId(videoUrl);
          if (videoId) {
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${videoId}`
            );
          }
          // this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          //   this.extractVideoUrl(data.data.video)
          // );
          // this.videoUrl = this.extractVideoUrl(data.data.video);
          // );
          console.log('video', this.videoUrl);

          this.readMoreItems = data.data.read_more.map(
            (item: any) => item.title
          );
          console.log(this.readMoreItems);
          this.trendingNews = data.data.treanding_news;
          console.log(this.trendingNews);

          this.readMoreItemsDetail = data.data.read_more.map(
            (item: any) => item.title
          );

          this.readMoreImagesDetail = data.data.read_more.flatMap((item: any) =>
            item.images.map((imageItem: any) => imageItem.image)
          );

          this.readMoreImages = data.data.read_more.flatMap((item: any) =>
            item.images.map((imageItem: any) => imageItem.image)
          );

          this.readMoreSlug = data.data.read_more
            .slice(0, 4)
            .map((item: any) => item.slug);

          // loop
          for (let i = 0; i < this.homePhotos.length; i++) {
            const srcRegex = /<img[^>]+src="([^">]+)"/;
            const match = this.homePhotos[i].content.match(srcRegex);
            const src = match ? match[1] : null;
            this.imagetitle = this.imageBaseURL + src;
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

    this.router.navigate(['home/videos'], {
      queryParams: { slug: slug },
    });
  }
  extractVideoUrl(htmlString: any) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const iframeElement = tempDiv.querySelector('iframe');

    const srcUrl = iframeElement ? iframeElement.src : '';
    return srcUrl;
  }
  // extractVideoUrl(videoData: string): string {
  //   // Extract video ID from the provided YouTube video URL
  //   const videoId = videoData.split('v=')[1];
  //   const ampersandPosition = videoId.indexOf('&');
  //   if (ampersandPosition !== -1) {
  //     return `https://www.youtube.com/embed/${videoId.substring(
  //       0,
  //       ampersandPosition
  //     )}`;
  //   } else {
  //     return `https://www.youtube.com/embed/${videoId}`;
  //   }
  // }
  extractVideoId(videoUrl: string) {
    const matches = videoUrl.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return matches ? matches[1] : null;
  }
}
