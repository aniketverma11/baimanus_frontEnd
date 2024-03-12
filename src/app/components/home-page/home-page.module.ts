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
import { NewsDetailsComponent } from './landing-page/news-details/news-details.component';
import { LoaderComponent } from '../../common-components/layout/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'subsribe',
    component: SubscribeComponent,
  },
  {
    path: 'plan_section',
    component: MembersPlansComponent,
  },
  {
    path: 'news-details',
    component: NewsDetailsComponent,
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
    NewsDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatRadioModule,

    RouterModule.forChild(routes),
  ], // Use forChild() for lazy-loaded modules
})
export class HomePageModule {}
