import { EventEmitter, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  public connectionEvent = new Subject<void>();
  public messageEvent = new Subject<string>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Web Socket is connected', frame);
      this.connectionEvent.next();  // Emit connection event

      this.stompClient.subscribe('/users/queue/messages', (message) => {
        console.log('Received message', message.body);
        this.messageEvent.next(message.body);  // Emit message event
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Error on STOMP connection', frame);
    };
  }

  connect(username: string, token: string): void {
    this.stompClient.connectHeaders = { username: username, Authorization: `Bearer ${token}` };
    this.stompClient.activate();
  }

  sendMessage(username: string, message: string): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/send`,
        headers: { username: username },
        body: message,
      });
    } else {
      console.error('Failed to send message due to connection error');
    }
  }
}
