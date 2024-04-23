import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.css',
})
export class ProfileDashboardComponent implements OnInit {
  active: boolean = true;
  previous: boolean = false;
  loggedUser: any;
  user_profile_picture: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const storedUserData = sessionStorage.getItem('loggedInUser');
      if (!storedUserData) {
        this.toastr.error('you are not authorized to access this');
        this.router.navigate(['/home']);
      }
      if (storedUserData) {
        this.getLoginInfo();
      }
    }
  }

  getLoginInfo() {
    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      const loggedInUser = storedUserData ? JSON.parse(storedUserData) : null;
      this.loggedUser = loggedInUser;
      this.user_profile_picture = this.loggedUser.picture;
      console.log(this.user_profile_picture);

      //
    }
  }
  logout(): void {
    sessionStorage.removeItem('loggedInUser');
    this.authService.signOut();
    this.toastr.success('logged out sucuess');
    this.router.navigate(['/home']);
  }
  plans() {
    this.active = true;
    this.previous = false;
  }
  previoustab() {
    this.previous = true;
    this.active = false;
  }
}
