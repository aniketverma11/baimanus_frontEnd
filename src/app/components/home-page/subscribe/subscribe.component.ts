import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent {
  subscribe() {
    // Handle subscription logic here
    console.log('Subscribe button clicked');
  }
}
