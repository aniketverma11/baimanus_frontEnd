import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signupdialog',
  templateUrl: './signupdialog.component.html',
  styleUrl: './signupdialog.component.css',
})
export class SignupdialogComponent implements OnInit {
  user!: SocialUser;

  constructor(
    private dialogRef: MatDialogRef<SignupdialogComponent>,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      // this.user = user;
    });
  }
  loginWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
