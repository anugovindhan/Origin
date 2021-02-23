import {Injectable} from '@angular/core';
import SockJs from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {

  connect() {
    const socket = new SockJs(`http://localhost:8091/websocket-example`);
    return Stomp.over(socket);
  }
}
