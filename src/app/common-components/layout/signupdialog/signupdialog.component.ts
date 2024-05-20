import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../enviroments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-signupdialog',
  templateUrl: './signupdialog.component.html',
  styleUrl: './signupdialog.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupdialogComponent implements OnInit, AfterViewInit {
  user!: SocialUser;
  private client_id = environment.google_client_id;
  loggedUser: any;
  constructor(
    private dialogRef: MatDialogRef<SignupdialogComponent>,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translateService: TranslateService,
    private router: Router
  ) {
    // this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    // this.translateService.onLangChange.subscribe((event) => {
    //   console.log('Language changed to:', event.lang);
    //   // React to language changes as needed
    // });
    // const user = this.authService.getFacebookUser();
    // console.log(user);

    if (typeof sessionStorage !== 'undefined') {
      const storedUserData = sessionStorage.getItem('loggedInUser');
      if (storedUserData) {
        this.getLoginInfo();
      }
    }
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: this.client_id,
      callback: (resp: any) => {
        this.handleLogin(resp);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 300,
    });
  }

  private decodeToken(token: string) {
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  handleLogin(response: any) {
    if (response && response.credential) {
      const payload = this.decodeToken(response.credential);

      if (payload) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
        this.toastr.success('logged In');
        this.router.navigate(['/home/dashboard']);
        this.closeDialog();
      } else {
        console.error('Invalid token payload');
      }
    } else {
      console.error('Invalid response or credential');
    }
  }

  loginWithGoogle() {}

  loginWithFacebook() {
    this.authService.signInWithFB();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  isDarkModeInLocalStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isDark = localStorage.getItem('darkMode');
      return isDark === 'true';
    } else {
      return false;
    }
  }
  getLoginInfo() {
    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      const loggedInUser = storedUserData ? JSON.parse(storedUserData) : null;
      this.loggedUser = loggedInUser;
      console.log(this.loggedUser);

      //
    }
  }
}
