// import { Injectable } from '@angular/core';
// import { Client } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
// import { StorageService } from './storage.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class WebSocketService {

//     private stompClient: Client;

//     constructor() {

//       this.stompClient = new Client({
//           webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
//           onConnect: () => {
//             console.log("conected")
//               this.stompClient.subscribe(`/sinhvien1/queue/notification`, message => {
//                 console.log("ok")
//                 const textData = message.body; // Nhận dữ liệu văn bản
//                 console.log("Received: " + textData);
//               });
//           },
//           onStompError: (error) => {
//             console.error('STOMP error:', error);
//         },
//         onWebSocketError: (error) => {
//             console.error('WebSocket error:', error);
//         },onDisconnect: () => {
//           console.log('Disconnected');
//       },
//       });
//   }
//     connect() {
//         this.stompClient.activate();
//     }

//     disconnect() {
//         this.stompClient.deactivate();
//     }
// }
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client;
  private connectionPromise: Promise<void>;

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });

    this.connectionPromise = new Promise((resolve, reject) => {
      this.stompClient.onConnect = (frame) => {
        console.log('Web Socket is connected', frame);
        resolve();
        this.stompClient.subscribe('/users/queue/messages', (message) => {
          console.log('Received message', message.body);
          // You can update the UI or perform other actions here
        });
      };

      this.stompClient.onStompError = (frame) => {
        console.error('Error on STOMP connection', frame);
        reject(frame);
      };
    });
  }

  connect(username: string): Promise<void> {
    this.stompClient.connectHeaders = { username: username };
    this.stompClient.activate();
    return this.connectionPromise;
  }

  sendMessage(username: string, message: string): void {
    this.connectionPromise.then(() => {
      this.stompClient.publish({
        destination: `/app/send`,
        headers: { username: username },
        body: message
      });
    }).catch(error => {
      console.error('Failed to send message due to connection error', error);
    });
  }
}
