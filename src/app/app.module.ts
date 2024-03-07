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
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './common-components/layout/loader/loader.component';
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
    ToastrModule.forRoot(),
  ],
  providers: [provideClientHydration(), JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
