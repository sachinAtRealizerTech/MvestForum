import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  //baseUrl = 'http://localhost:4001';
  //baseUrlServer = 'https://mvestapp.herokuapp.com';
  constructor(private httpclient: HttpClient) { }

  getMemberNeighborsWithFilter(body) {
    return this.httpclient.post<any[]>(`${environment.APIBASEURL}/Neighbor/get_member_neighbors_withfilters`, body, Utils.getAuthHeader())
  }
  getAllChatThreadsOfUser(chatRoom) {
    debugger;
    return this.httpclient.post<any[]>(`${environment.BaseUrlChatServer}/chatroom/`, chatRoom);
  }
  getChatRoomsChat(chatRoom) {
    debugger;
    return this.httpclient.post<any[]>(`${environment.BaseUrlChatServer}/chatroom/`, chatRoom);
  }
  createJoinRequest(chatRoom) {
    debugger;
    return this.httpclient.post<any[]>(`${environment.BaseUrlChatServer}/chatroom/`, chatRoom);
  }
  getUsersChatThreads(currentUserSortedData) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/myThreads/` + currentUserSortedData);
  }
  getUsersSelectedThreadChatHistory(threadDocId) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/getThreadMessages/` + threadDocId);
  }
}
