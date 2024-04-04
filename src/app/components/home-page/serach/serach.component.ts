import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrl: '../subscribe/subscribe.component.css',
})
export class SerachComponent {
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = false;
  type: any;
  searchSubject = new Subject<string>();
  searchValue: any;

  constructor(
    private apiService: ApiServicesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }

    // Subscribe to the searchSubject
    this.searchSubject
      .pipe(
        debounceTime(300) // Adjust debounce time as needed
      )
      .subscribe((value: string) => {
        this.search(value);
      });
  }

  onKeyPress(event: any) {
    // Emit the input value to the searchSubject
    this.searchSubject.next(event.target.value);
  }

  search(value: string) {
    console.log(value);
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.serach(value, this.type).subscribe(
        (data) => {
          this.isLoading = false;
          this.searchValue = data.data;
          console.log(data);
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        }
      )
    );
  }

  getHomeContentBySlug(slug: any) {
    this.router.navigate(['home/news-details'], {
      queryParams: { slug: slug },
    });
  }
}
