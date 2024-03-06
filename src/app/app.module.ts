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

@NgModule({
  declarations: [AppComponent, SidebarComponent, FooterComponent],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
