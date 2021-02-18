import { Component, OnInit } from '@angular/core';
import {WebsocketServiceService} from '../websocket-service.service';
import {LoginService, User} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public notifications = 0;
  public mess: any;

  constructor(private webSocketService: WebsocketServiceService,
              private router: Router,
              private loginService: LoginService){

    // Open connection with server socket
    const stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

      // Subscribe to notification topic
      stompClient.subscribe('/topic/notification', notifications => {

        // Update notifications attribute with the recent messsage sent from the server
        // console.log('test', notifications );
        this.mess = notifications.body;
        // this.notifications = JSON.parse(notifications.body).count;
      });
    });
  }


  logOut() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }
}
