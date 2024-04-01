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
import { ToastrService } from 'ngx-toastr';
import { TextSizingService } from '../../../../../services/text-sizing.service';
import { ThemeService } from '../../../../common-components/layout/theme.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent implements AfterViewInit {
  @ViewChild('commentsSection') commentsSection!: ElementRef;
  private imageBaseURL = environment.imagesBaseURL;
  private websiteUrl = environment.webiste_url;

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
  textSize: string = 'medium';
  type: any;
  isCommnetEnable: boolean = false;
  readMoreItemsNew: any;
  isAudioPlaying: boolean = false;
  audio: HTMLAudioElement = new Audio();
  darkMode: boolean;
  constructor(
    private route: ActivatedRoute,

    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private textSizeService: TextSizingService,
    private themeService: ThemeService
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
      this.slug = params['slug'];

      if (this.slug) {
        this.getHomeContentBySlug(this.slug);
        this.textSizeService.textSize$.subscribe((size) => {
          this.textSize = size;
        });
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
    if (!this.type) {
      this.type = 'english';
    }

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService
        .getHomeContentBySlug(slug, this.type)
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
                .map((item: any) => item);

              this.readMoreImagesDetail = data.data.read_more
                .slice(0, 4)
                .map((item: any) => item.image);
            }
          }
          if (data.data.is_for_members === true) {
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
    const type = 'english';
    this.unsubscribe.add(
      this.apiService.getHomeContent(type).subscribe(
        (data) => {
          this.homeInfo = data.data;
          this.belowContent = data.data;
          this.homeContent = data?.data[0];

          this.homeInfo = data.data.slice(0, 3).map((item: any) => item.title);
          this.readMoreItemsNew = data.data
            .slice(0, 4)
            .map((item: any) => item);
          this.readMoreItems = data.data.slice(0, 4).map((item: any) => item);
          this.readMoreImages = data.data
            .slice(0, 4)
            .map((item: any) => item?.image);
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

  NavigateWithSlug(slug: any) {
    this.router.navigate(['home/news-details'], {
      queryParams: { slug: slug },
    });
  }
  playAudio(file: any) {
    const audio = new Audio();
    audio.src = this.imageBaseURL + file;
    audio.play();
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

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
