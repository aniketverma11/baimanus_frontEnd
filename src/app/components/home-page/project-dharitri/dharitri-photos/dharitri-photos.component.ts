import { DharitruPhotosDetailsComponent } from './dharitru-photos-details/dharitru-photos-details.component';
import { Subscription } from 'rxjs';
import { ApiServicesService } from '../../../../../services/api-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TextSizingService } from '../../../../../services/text-sizing.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ThemeService } from '../../../../common-components/layout/theme.service';
import { SwiperContainer } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../../../enviroments/environment';
import { PhotosDetailsComponent } from '../../landing-page/photos/photos-details/photos-details.component';
@Component({
  selector: 'app-dharitri-photos',
  templateUrl: './dharitri-photos.component.html',
  styleUrl: './dharitri-photos.component.css',
})
export class DharitriPhotosComponent {
  oneImageOptions: OwlOptions = {
    loop: false,
    items: 1,
    nav: true,
    dots: false,
  };
  expandedOptions: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2,
    //   },
    //   740: {
    //     items: 3,
    //   },
    //   940: {
    //     items: 4,
    //   },
    // },
  };

  private imageBaseURL = environment.imagesBaseURL;
  @Input() swiperContainerId = '';
  @ContentChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  initialized = false;

  index = 0;
  slidePerView = 1;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  isAudioPlaying: boolean = false;
  audio: HTMLAudioElement = new Audio();
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
  type: any;
  currentIndex = 0;
  currentImage: string = '';
  private websiteUrl = environment.webiste_url;
  @ViewChild('commentsSection') commentsSection!: ElementRef;
  isCommnetEnable: boolean = false;
  slidesImages: any;
  textSize: string = 'medium';
  expanded: boolean = false;
  constructor(
    private apiService: ApiServicesService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private textSizeService: TextSizingService,
    private themeService: ThemeService,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.slug = params['slug'];

      if (this.slug) {
        this.getHomePhotos(this.slug);
        this.textSizeService.textSize$.subscribe((size) => {
          this.textSize = size;
        });
      }
      if (!this.slug) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const shadowRoot = document
        .getElementById(this.swiperContainerId)
        ?.getElementsByClassName('swiper')[0]?.shadowRoot
        ?.firstChild as HTMLElement;
      shadowRoot.style.paddingBottom = '35px';
    }, 300);
  }
  changeSlide(prevOrNext: number): void {
    if (prevOrNext === -1) {
      this.swiperRef.nativeElement.swiper.slidePrev();
    } else {
      this.swiperRef.nativeElement.swiper.slideNext();
    }
  }

  getHomePhotos(slug: string) {
    // slug = 'test';

    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotosDetails(slug, this.type).subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;
          if (
            this.homePhotos &&
            this.homePhotos.images &&
            Array.isArray(this.homePhotos.images)
          ) {
            //   this.slidesImages = this.homePhotos.images.map(
            //     (image: any) => this.imageBaseURL + image.image.replace(/"/g, '')
            //   );
            // }
            this.slidesImages = this.homePhotos.images;
          }

          this.trendingNews = data.data.treanding_news;

          this.readMoreItemsDetail = data.data.read_more.map(
            (item: any) => item.title
          );

          this.readMoreImagesDetail = data.data.read_more.flatMap((item: any) =>
            item.images.map((imageItem: any) => imageItem.image)
          );

          this.readMoreItems = data.data.read_more.map(
            (item: any) => item.title
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

  // prev(index: number) {
  //   if (this.currentIndex === index) {
  //     this.currentIndex =
  //       (this.currentIndex + this.homePhotos.images.length - 1) %
  //       this.homePhotos.images.length;
  //   }
  // }

  // next(index: number) {
  //   if (this.currentIndex === index) {
  //     this.currentIndex =
  //       (this.currentIndex + 1) % this.homePhotos.images.length;
  //   }
  // }

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

  //

  // prevImage(): void {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //     this.currentImage = this.getFullImagePath(
  //       this.homePhotos.images[this.currentIndex].image
  //     );
  //   }
  // }

  // nextImage(): void {
  //   if (this.currentIndex < this.homePhotos.images.length - 1) {
  //     this.currentIndex++;
  //     this.currentImage = this.getFullImagePath(
  //       this.homePhotos.images[this.currentIndex].image
  //     );
  //   }
  // }
  get themeServiceInstance(): ThemeService {
    return this.themeService;
  }
  expandCarousel(): void {
    this.expanded = true;
  }
  // Inside your component class

  showNextSlide() {
    if (this.currentIndex < this.slidesImages.length - 1) {
      this.currentIndex++;
    }
  }

  showPreviousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  shrinkCarousel(): void {
    this.expanded = false;
  }

  viewPhoto(imageUrl: string) {
    this.router.navigate(['/photo-view'], { queryParams: { imageUrl } });
  }
  openDialog(data: string): void {
    console.log(data);

    const dialogRef = this.dialog.open(PhotosDetailsComponent, {
      data: data,
      maxWidth: '100vw',
      // maxHeight: '100vh',
      width: '100%',
      height: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
}
