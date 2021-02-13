import { Injectable } from '@angular/core';
import SockJs from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  connect() {
    const socket = new SockJs(`http://localhost:8080/socket`);

    const stompClient = Stomp.over(socket);

    return stompClient;
  }
}
