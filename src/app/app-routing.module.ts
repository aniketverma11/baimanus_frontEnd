import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/home-page/landing-page/landing-page.component';
import { TranslatePipe } from '@ngx-translate/core';

const routes: Routes = [
  // { path: '', component: LandingPageComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
