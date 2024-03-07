import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  constructor() {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    // this.Sess
    this.router.navigate(['/']);
  }
}
