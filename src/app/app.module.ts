import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {HomeComponent} from './home/home.component';
@NgModule({
  imports:      [ BrowserModule],
  providers:    [ ],
  declarations: [
    AppComponent,
    UserDashboardComponent,
    HomeComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
