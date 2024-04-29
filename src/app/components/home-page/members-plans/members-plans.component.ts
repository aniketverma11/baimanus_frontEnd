import { Component } from '@angular/core';

@Component({
  selector: 'app-members-plans',
  templateUrl: './members-plans.component.html',
  styleUrl: './members-plans.component.css',
})
export class MembersPlansComponent {
  type: any;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.type = localStorage.getItem('language');
    }
  }
}
