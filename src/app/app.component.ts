import { Component } from '@angular/core';
import {WebsocketServiceService} from './websocket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public notifications = 0;
  public mess: any;

  constructor(private webSocketService: WebsocketServiceService) {

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
}
