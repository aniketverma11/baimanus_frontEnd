import { Component } from '@angular/core';
import { ThemeService } from '../../../common-components/layout/theme.service';
import { ApiServicesService } from '../../../../services/api-services.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent {
  themeServiceInstance: ThemeService;
  constructor(
    private apiService: ApiServicesService,
    // private sanitizer: DomSanitizer,
    // private router: Router,
    private themeService: ThemeService
  ) {
    this.themeServiceInstance = this.themeService;
    console.log(this.themeServiceInstance);
  }
  subscribe() {
    // Handle subscription logic here
    console.log('Subscribe button clicked');
  }
}
