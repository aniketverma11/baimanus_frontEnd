import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { SignupdialogComponent } from '../signupdialog/signupdialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  darkMode: boolean;
  @ViewChild('drawer') drawer!: MatDrawer;
  isExpanded: boolean = true;
  isSidebarExpanded = false;
  isMobile: boolean;

  private mobileQueryListener: () => void;

  constructor(
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) {
    this.darkMode = this.themeService.isDarkMode();
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.isMobile = this.media.matchMedia('(max-width: 600px)').matches;
    this.media
      .matchMedia('(max-width: 600px)')
      .addListener(this.mobileQueryListener);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.themeService.toggleDarkMode();
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, ' background-color', ' rgb(255, 255, 255)');
    this.renderer.setStyle(sidebar, ' color', 'green');
  }

  toggleSidebar() {
    if (this.isMobile) {
    } else {
      this.drawer.toggle();
      this.isSidebarExpanded = !this.isSidebarExpanded;
    }
  }

  ngOnDestroy(): void {
    this.media
      .matchMedia('(max-width: 600px)')
      .removeListener(this.mobileQueryListener);
  }
  public showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'display', 'flex');
  }
  public close() {
    const sidebar = document.querySelector('.sidebar');
    this.renderer.setStyle(sidebar, 'display', 'none');
  }

  ngOnInit() {}

  openPaymentModal(): void {
    const dialogRef = this.dialog.open(SignupdialogComponent, {
      width: '1380px',
      height: '700px',
    });

    // You can also subscribe to the 'afterClosed' event if you want to perform actions when the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
