import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  constructor(private authService: SocialAuthService) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOutFaceBook(): void {
    this.authService.signOut();
  }

  getFacebookUser() {
    this.authService.authState.subscribe((user) => {
      return user;
    });
  }
}
