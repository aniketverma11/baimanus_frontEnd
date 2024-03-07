import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { SignupdialogComponent } from '../signupdialog/signupdialog.component';
import { CategoryService } from '../../../../services/category.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

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

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
    this.darkMode = this.themeService.isDarkMode();
  }

  ngOnInit() {
    this.getAllCategories();

    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      this.getLoginInfo();
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.themeService.toggleDarkMode();
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, ' background-color', ' rgb(255, 255, 255)');
    this.renderer.setStyle(sidebar, ' color', 'green');
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
    this.isLoading = true;
    this.unsubscribe.add(
      this.categoryService.getAllCategories().subscribe(
        (data) => {
          this.isLoading = false;

          this.categoryList = data;
          this.visibleCategories = [...this.categoryList.slice(0, 5)];
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
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
