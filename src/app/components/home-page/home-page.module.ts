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
import { PhotosComponent } from './landing-page/photos/photos.component';
import { VideosComponent } from './landing-page/videos/videos.component';
import { PhotosDetailsComponent } from './landing-page/photos/photos-details/photos-details.component';
import { NewsSectionComponent } from './landing-page/news-section/news-section.component';
import { HomePageVideosComponent } from './landing-page/videos/home-page-videos/home-page-videos.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatMenuModule } from '@angular/material/menu';
import { SerachComponent } from './serach/serach.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { AboutUsComponent } from './about-us/about-us.component';
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
  {
    path: 'photos',
    component: PhotosComponent,
  },

  {
    path: 'videos',
    component: VideosComponent,
  },
  {
    path: 'search',
    component: SerachComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
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
    VideosComponent,
    PhotosComponent,
    PhotosDetailsComponent,
    NewsSectionComponent,
    HomePageVideosComponent,
    SubscribeComponent,
    SerachComponent,
    CategoryDetailsComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    TranslateModule,
    MatRadioModule,
    YouTubePlayerModule,
    RouterModule.forChild(routes),
    MatMenuModule,
  ], // Use forChild() for lazy-loaded modules
})
export class HomePageModule {}
