import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  //private socket = io('http://localhost:4001');
  private socket = io(`${environment.BaseUrlChatServer}`);
  constructor(private http: HttpClient) { }

  joinRoom(data) {
    debugger;
    console.log(data);
    this.socket.emit('join', data);
  }
  joinToAllThread(data) {
    console.log('threads in web socket----------->', data);
    this.socket.emit('jointoallthreads', data);
  }

  sendMessage(data) {
    debugger;
    this.socket.emit('message', data);
  }
  typing(data) {
    this.socket.emit('typing', data);
  }
  receivedTyping() {
    const observable = new Observable<any>(observer => {
      this.socket.on('typing', (data) => {
        console.log('typing from web socket service...', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newMessageReceived() {
    debugger;
    const observable = new Observable<{ message: any }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  invitationRequest() {
    const observable = new Observable<any>(observer => {
      this.socket.on('invitation', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getAllChattingThreads(data) {
    debugger;
    this.socket.emit('allThreads', data);
  }
  allThreadsReceived() {
    debugger;
    const observable = new Observable<{ message: any }>(observer => {
      this.socket.on('allThreads', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
