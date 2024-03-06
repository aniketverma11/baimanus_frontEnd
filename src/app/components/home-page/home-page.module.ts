// home-page.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeComponent } from '../home-page/subscribe/subscribe.component';
import { MembersPlansComponent } from './members-plans/members-plans.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MemberstopComponent } from './members-plans/memberstop/memberstop.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    // children: [
    //   { path: '', component: LandingPageComponent }, // Landing page as a child route
    //   // Add other child routes for the home page module if needed
    // ],
  },
  {
    path: 'subsribe',
    component: SubscribeComponent,
  },
  {
    path: 'plan_section',
    component: MembersPlansComponent,
  },
];

@NgModule({
  declarations: [
    HomePageComponent,
    LandingPageComponent,
    MembersPlansComponent,
    PaymentCardComponent,
    ConfirmationDialogComponent,
    MemberstopComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatRadioModule,
    RouterModule.forChild(routes),
  ], // Use forChild() for lazy-loaded modules
})
export class HomePageModule {}
