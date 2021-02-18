import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from './app.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {HomeComponent} from './home/home.component';
import {WebsocketServiceService} from './websocket-service.service';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [WebsocketServiceService],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
