import { Component } from '@angular/core';
import { ApiServicesService } from '../../../../services/api-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrl: '../subscribe/subscribe.component.css',
})
export class SerachComponent {
  private unsubscribe: Subscription = new Subscription();
  isLoading: boolean = false;
  // SEARCH;

  constructor(private apiService: ApiServicesService) {}

  search(slug: string, type: any) {
    this.isLoading = true;
    this.unsubscribe.add(
      this.apiService.serach(slug, type).subscribe(
        (data) => {
          this.isLoading = false;

          console.log(data);
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        }
      )
    );
  }
}
