import { SocialUser } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../enviroments/environment';
import { ToastrService } from 'ngx-toastr';
declare var google: any;

@Component({
  selector: 'app-signupdialog',
  templateUrl: './signupdialog.component.html',
  styleUrl: './signupdialog.component.css',
})
export class SignupdialogComponent implements OnInit, AfterViewInit {
  user!: SocialUser;
  private client_id = environment.google_client_id;
  constructor(
    private dialogRef: MatDialogRef<SignupdialogComponent>,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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
      width: 350,
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
        window.alert('logged In sucuess');
        window.location.reload();
        this.toastr.success('logged In');
        sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
        this.closeDialog();
      } else {
        console.error('Invalid token payload');
      }
    } else {
      console.error('Invalid response or credential');
    }
  }

  loginWithGoogle() {}

  loginWithFacebook() {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
