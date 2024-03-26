import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from './common-components/layout/sidebar/sidebar.module';
import { LayoutModule } from './common-components/layout/layout.module';
import { LayoutComponent } from './common-components/layout/layout.component';
import { SidebarComponent } from './common-components/layout/sidebar/sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './common-components/layout/footer/footer.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './common-components/layout/loader/loader.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),

    ToastrModule.forRoot({ positionClass: 'toast-center-center' }),
  ],
  providers: [provideClientHydration(), JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
