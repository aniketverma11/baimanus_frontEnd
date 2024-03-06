import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signupdialog',
  templateUrl: './signupdialog.component.html',
  styleUrl: './signupdialog.component.css',
})
export class SignupdialogComponent {
  constructor(private dialogRef: MatDialogRef<SignupdialogComponent>) {}
  // constructor(private auth: AngularFireAuth, private fb: FacebookService) {
  //   const initParams: InitParams = {
  //     appId: 'YOUR_FACEBOOK_APP_ID',
  //     xfbml: true,
  //     version: 'v10.0',
  //   };
  //   fb.init(initParams);
  // }
  loginWithGoogle() {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    //   this.fb.login().then((response: LoginResponse) => {
    //     console.log(response);
    //   });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
