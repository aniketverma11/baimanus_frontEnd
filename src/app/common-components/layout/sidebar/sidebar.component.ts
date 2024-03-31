import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SignupdialogComponent } from '../signupdialog/signupdialog.component';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language.service';
import { Router } from '@angular/router';
import { LanguageChangeServiceService } from '../../../../services/language-change-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private unsubscribe: Subscription = new Subscription();
  darkMode: boolean;
  @ViewChild('drawer') drawer!: MatDrawer;
  isExpanded: boolean = true;
  isSidebarExpanded = false;
  categoryList: any;
  visibleCategories: any[] = [];
  showAll = false;
  loggedUser: any;
  user_profile_picture: any;
  showDropdown = false;
  isLoading: boolean = false;
  type: any = 'english';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private translateService: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router,
    private LanguageChangeService: LanguageChangeServiceService
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    this.themeService.darkModeChanged.subscribe((darkMode: boolean) => {
      this.darkMode = darkMode;
    });

    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
    this.getAllCategories();

    if (typeof sessionStorage !== 'undefined') {
      const storedUserData = sessionStorage.getItem('loggedInUser');
      if (storedUserData) {
        this.getLoginInfo();
      }
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.themeService.toggleDarkMode();
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  toggleSidebar() {}

  public showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'display', 'flex');
  }
  public close() {
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'display', 'none');
  }

  openPaymentModal(): void {
    const dialogRef = this.dialog.open(SignupdialogComponent, {
      width: '1380px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
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
          console.log(this.categoryList);

          this.visibleCategories = [...this.categoryList.slice(0, 10)];
          console.log(this.visibleCategories);
        },
        (error) => {
          console.error(error);
        }
      )
    );
  }

  showMore() {
    this.visibleCategories = [...this.categoryList];
    this.showAll = true;
  }

  getLoginInfo() {
    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      const loggedInUser = storedUserData ? JSON.parse(storedUserData) : null;
      this.loggedUser = loggedInUser;
      this.user_profile_picture = this.loggedUser.picture;
      //
      console.log(this.loggedUser);
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  logout(): void {
    window.alert('logged out sucuess');
    window.location.reload();
    sessionStorage.removeItem('loggedInUser');
    this.authService.signOut();
    this.getAllCategories();
  }

  switchLanguage() {
    const currentLanguage = this.translateService.currentLang;
    const newLanguage = currentLanguage === 'en' ? 'mr' : 'en';
    const isLanguageAlready = localStorage.getItem('language');

    if (!isLanguageAlready) {
      let setlangauge: string;
      if (currentLanguage === 'en') {
        setlangauge = 'marathi';
        localStorage.setItem('language', setlangauge);
      }
      if (currentLanguage === 'mr') {
        setlangauge = 'english';
        console.log('113331');

        localStorage.setItem('language', setlangauge);
      }
    }
    if (isLanguageAlready) {
      let setlangauge: string;
      if (currentLanguage === 'en') {
        setlangauge = 'marathi';
        localStorage.setItem('language', setlangauge);
      }
      if (currentLanguage === 'mr') {
        setlangauge = 'english';
        console.log('113331');

        localStorage.setItem('language', setlangauge);
      }
    }

    this.translateService.use(newLanguage);
    this.LanguageChangeService.emitLanguageChange();
    const currentUrl = this.router.url;
    // if (currentUrl === '/home') {
    //   // location.reload();
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }

  checkScreenWidth() {
    if (window.innerWidth > 768) {
      const sidebar = document.querySelector('.sidebar');
      this.renderer.setStyle(sidebar, 'display', 'none');
    } else {
    }
  }
  navigateToPlan() {
    this.router.navigate(['/home/plan_section']);
    this.checkScreenWidth();
  }
  getHomeContentBySlug(slug: any) {
    console.log(slug);

    this.router.navigate(['home/news-details'], {
      queryParams: { slug: slug },
    });
  }
  onmenuCHange() {}

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
