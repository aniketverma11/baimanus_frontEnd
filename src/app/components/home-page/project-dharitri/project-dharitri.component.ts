import { Component } from '@angular/core';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription, catchError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../enviroments/environment';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { LanguageService } from '../../../../services/language.service';
import { LanguageChangeServiceService } from '../../../../services/language-change-service.service';

@Component({
  selector: 'app-project-dharitri',
  templateUrl: './project-dharitri.component.html',
  styleUrl: './project-dharitri.component.css',
})
export class ProjectDharitriComponent {
  // public projectDescription: string = `
  //   BaiManus आवि Asar यांच्या संयक्त विद्यमानाने क्लायमेट चेंज अँ@ जें@र
  //   या विषयनांतर्गत हामान बदलाचे लिर्गं निहाय परिणाम, त्या
  //   रील समस्या आवि समस्यांचे निराकरीत यासंदर्भातील पत्रकारितेला तळारगाळातील महिलांच्या
  //   माध्यमातन पूढे आणण्यासाठी परोजेक्टधरितरी हा प्रकल्प स्रुकेला आहे. धरितरी प्रकल्पाचे उद्दिष्ट
  //   जागरुकता निर्माण करण्याचे आवि लिर्गं आवि हामानाचा छेदनबिंदू समजन घे हे आहे.
  //   या परकल्पाच्या माध्यमातन आम्हाला आशा आहे की हामान बदलाचा लिर्गं निहाय परिणाम याबबतयासंबंधित पत्रकारितेचे
  //   लोकशाहीकरी होईल, कारसध्या त्याचा बराचसा भारगइंर्गरजी भाषेमध्ये आहे, तोही राष्ट्रीय आवि आंतरराष्ट्रीय पातळी र.
  //   आम्हाला विश्वास आहे की हा परकल्प आम्हाला महाराष्ट्राच्या
  //   तळारगाळातील लोकांपर्यंत हामान बदलाचा लिर्गं निहाय परिणाम सामान्य
  //   लोकांसंदर्भात मदत करेल.
  // `;

  public projectDescription: string = `
   हवामान बदलाच्या संकटाचा सामना करताना, त्याच्या प्रभावांचे लिंग परिणाम समजून घेणे आणि ते धोरणात्मक चौकटीत प्रतिबिंबित होणे महत्त्वाचे आहे. हवामान बदलामुळे  स्त्रियांना उच्च जोखीमांचा सामना करावा लागतो आणि हवामान बदलाच्या परिणामांचा मोठा भार त्यांना सहन करावा लागतो. हे विशेषतः आरोग्यावर होणाऱ्या विपरित परिणामांच्या बाबतीत दिसून आले आहे. त्यामुळे लिंग-संबंधित आरोग्य असमानता आणि विषमता वाढते. हाच मुद्दा लक्षात घेऊन BaiManus आणि ASAR यांच्या संयुक्त विद्यमाने ‘प्रोजेक्ट धरित्री’ हा हवामान बदल आणि लिंगभाव (Climate and Gender) या विषयाशी संबंधीत उपक्रम सुरू करण्यात येत आहे. हवामान बदलाचे लिंगनिहाय परिणाम, त्यावरील समस्या आणि समस्यांचे निराकरण यासंदर्भातील पत्रकारितेला तळागाळातील महिलांच्या माध्यमातून पुढे आणण्यासाठी प्रोजेक्ट धरित्री हा प्रकल्प सुरू केला आहे. या प्रकल्पाच्या माध्यमातून हवामान बदल आणि त्याचे लिंगनिहाय परिणाम याविषयाशी संबंधित पत्रकारितेचे लोकशाहीकरण करण्याचा आमचा प्रयत्न आहे.
    `;

  private imageBaseURL = environment.imagesBaseURL;
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = true;
  homeContent: any;
  homePhotos: any;
  headingPhoto: any;
  headingTitle: any[] = [];
  imagetitle: string = '';
  homeInfo: any;
  belowContent: any;
  readMoreItems: any;
  readMoreImages: any;
  homePhotosSlug: any;
  VideoObject: any;
  VideoTitle: any;
  videoImages: any;
  type: string = 'dhariti';
  homeInfoSlug: any;
  darkMode: boolean;
  categoryList: any;
  categoryListPosts: any;
  VideoObject2: any;
  constructor(
    private apiService: ApiServicesService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private LanguageChangeService: LanguageChangeServiceService
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    this.themeService.darkModeChanged.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    });

    this.getHomeContent();
    this.getHomePhotos();
    this.getHomeVideos();
    this.getAllCategories();
  }
  getHomePhotos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getPhotos(this.type).subscribe(
        (data) => {
          this.isLoading = false;
          this.homePhotos = data.data;

          this.homePhotosSlug = data.data[0].slug;

          this.headingPhoto = this.homePhotos[0]?.content;
          const srcRegex = /<img[^>]+src="([^">]+)"/;
          const match = this.headingPhoto.match(srcRegex);
          const src = match ? match[1] : null;
          this.imagetitle = this.imageBaseURL + src;

          this.headingTitle = this.homePhotos
            .slice(0, 3)
            .map((item: any) => item);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  getHomeContent() {
    this.isLoading = true;

    this.unsubscribe.add(
      this.apiService.getHomeContent(this.type).subscribe(
        (data) => {
          // this.homeInfo = data.data;
          this.belowContent = data.data;
          this.homeContent = data?.data[0];

          this.homeInfo = data.data.slice(1).map((item: any) => item);

          this.homeInfoSlug = data.data
            .slice(0, 3)
            .map((item: any) => item.slug);

          this.readMoreItems = data.data.slice(0, 3).map((item: any) => item);

          this.readMoreImages = data.data
            .slice(0, 4)
            .map((item: any) => item.image);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  // getHomeContentBySlug(slug: any) {
  //   this.router.navigate(['home/dharitries-details'], {
  //     queryParams: { slug: slug },
  //   });
  // }
  getHomeContentBySlug(slug: any, category: any) {
    this.router.navigate(['home/dharitries-details'], {
      queryParams: { slug: slug, category: category },
    });
  }

  getFullImagePath(relativePath: string): string {
    return `${this.imageBaseURL}${relativePath}`;
  }

  getSanitizedContent(): any {
    if (this.headingPhoto) {
      // Replace the image source with the base URL
      const sanitizedContent = this.headingPhoto.replace(
        /src="\/media/g,
        `src="${this.imageBaseURL}/media`
      );

      // Use DomSanitizer to sanitize the HTML content
      return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
    }
  }

  getHomeVideos() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.getViideos(this.type).subscribe(
        (res) => {
          this.isLoading = false;
          this.VideoObject = res.data[0];

          // this.VideoObject2 = res.data[1];

          // console.log(this.VideoObject2);
          this.VideoTitle = res.data.slice(1).map((item: any) => item);

          this.videoImages = res.data
            .slice(0, 3)
            .map((item: any) => item.image);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  navigate(slug: any) {
    this.router.navigate(['home/dharitries-photos'], {
      queryParams: { slug: slug },
    });
  }
  navigateVideos(slug: any) {
    this.router.navigate(['home/dharitries-videos'], {
      queryParams: { slug: slug },
    });
  }
  get themeServiceInstance(): ThemeService {
    return this.themeService;
  }

  getAllCategories() {
    this.isLoading = true;
    this.unsubscribe.add(
      this.categoryService.getFourCategories(this.type).subscribe(
        (data) => {
          this.isLoading = false;

          this.categoryList = data.data;

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

  async getLandingPageCategoryDetails(
    slug: string,
    index: number
  ): Promise<string> {
    try {
      this.isLoading = true;
      const res = await this.categoryService
        .getFourCategories(this.type)
        .toPromise();
      this.isLoading = false;
      return res.data.title;
    } catch (error) {
      console.error(error);
      return ''; // or handle error as needed
    }
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
  getTagStyle() {
    if (this.isDarkModeInLocalStorage()) {
      return {
        color: '#fa9000',
      };
    } else {
      return {
        color: '#35144f',
      };
    }
  }
  getTagStyleTitle() {
    if (this.isDarkModeInLocalStorage()) {
      return {
        color: '#fa9000',
      };
    } else {
      return {
        color: '#fff',
      };
    }
  }
  getTagStyleTitleMoreNews() {
    if (this.isDarkModeInLocalStorage()) {
      return {
        color: '#fa9000',
        'background-color': 'black',
      };
    } else {
      return {
        color: '#fa9000',
        'background-color': 'white',
      };
    }
  }
  getshortDis() {
    if (this.isDarkModeInLocalStorage()) {
      return {
        color: 'white',
        'background-color': 'rgb(51, 51, 51)',
      };
    } else {
      return {
        color: '#000000',
        'background-color': 'white',
      };
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
