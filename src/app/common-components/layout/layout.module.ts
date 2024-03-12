import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupdialogComponent } from './signupdialog/signupdialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { LoaderComponent } from './loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';
export function tokenGetter() {
  return sessionStorage.getItem('loggedInUser');
}
@NgModule({
  declarations: [SignupdialogComponent],

  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,

    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['*'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],

  providers: [
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('434343'),
          },
          // 807269351450476
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class LayoutModule {}
