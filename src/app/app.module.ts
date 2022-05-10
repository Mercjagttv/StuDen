import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AccommodationComponent } from './accommodation.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';
import { SaccommodationComponent } from './saccommodation';
import { AboutusComponent } from './aboutus.component';
import { ContactusComponent } from './contactus.component';
import { AddaccommodationComponent } from './addaccommodation.component';
import { FilteraccommodationComponent } from './filteraccommodation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'studen',
    component: AccommodationComponent
  },
  {
    path: 'accommodation/:id',
    component: SaccommodationComponent
  },
  {
    path: 'addaccommodation',
    component: AddaccommodationComponent
  },
  {
    path: 'filteraccommodation',
    component: FilteraccommodationComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  }

];

@NgModule({
  declarations: [
    AppComponent, AccommodationComponent, HomeComponent,
    NavComponent, SaccommodationComponent, AboutusComponent, ContactusComponent, FilteraccommodationComponent, AddaccommodationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, MatCardModule,
    FlexLayoutModule, RouterModule.forRoot(routes), ReactiveFormsModule,
    AuthModule.forRoot( {
      domain: 'dev-t5v8vk55.us.auth0.com',
      clientId: '5zVPi7NuMIXtyVK7z1Mz83DWiOZ07p6P'
    }),
    BrowserAnimationsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})

export class AppModule { }
