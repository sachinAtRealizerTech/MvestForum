import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpclient: HttpClient) { }

  getMembers(body) {
    return this.httpclient.post<any[]>(`${environment.APIBASEURL}/Neighbor/get_member_neighbors_withfilters`, body, Utils.getAuthHeader())
  }

  getUsersChatThreads(emailId) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/myThreads/` + emailId);
  }

  getThreadMessages(threadId) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/getThreadMessages/` + threadId);
  }
}
