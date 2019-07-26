import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthModule} from './auth/auth.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactUsComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
