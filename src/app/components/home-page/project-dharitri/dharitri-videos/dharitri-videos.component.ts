import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { environment } from '../../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TextSizingService } from '../../../../../services/text-sizing.service';
import { ThemeService } from '../../../../common-components/layout/theme.service';

@Component({
  selector: 'app-dharitri-videos',
  templateUrl: './dharitri-videos.component.html',
  styleUrl: './dharitri-videos.component.css',
})
export class DharitriVideosComponent {
  @ViewChild('commentsSection') commentsSection!: ElementRef;
  private websiteUrl = environment.webiste_url;
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
  type: string = 'dhariti';
  isCommnetEnable: boolean = false;
  isAudioPlaying: boolean = false;
  audio: HTMLAudioElement = new Audio();
  textSize: string = 'medium';
  constructor(
    private apiService: ApiServicesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private textSizeService: TextSizingService,
    private themeService: ThemeService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.slug = params['slug'];

      if (this.slug) {
        this.getHomeVideos(this.slug);
        this.textSizeService.textSize$.subscribe((size) => {
          this.textSize = size;
        });
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {}

  getHomeVideos(slug: string) {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getVideosDetails(slug, this.type).subscribe(
        (data) => {
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

          this.readMoreItems = data.data.read_more;
          this.trendingNews = data.data.treanding_news;

          this.readMoreItemsDetail = data.data.read_more;

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

  urlAndCopylink() {
    const completeUrl = `${this.websiteUrl}/home/news-details?slug=${this.slug}`;

    this.copyToClipboard(completeUrl);
  }
  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // window.alert('');
    this.toastr.success('Link copied');
  }
  setTextSize(size: string) {
    this.textSizeService.setTextSize(size);
  }
  bookmark() {
    this.toastr.success('Bookmark added');
  }
  isCommnet() {
    this.isCommnetEnable = true;
    this.commentsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  playOrPauseAudio(file: string) {
    if (!this.isAudioPlaying) {
      // If audio is not playing, start playing
      this.audio.src = this.imageBaseURL + file;
      this.audio.play();
      this.isAudioPlaying = true;
    } else {
      // If audio is playing, pause it
      this.audio.pause();
      this.isAudioPlaying = false;
    }
  }
  get themeServiceInstance(): ThemeService {
    return this.themeService;
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
