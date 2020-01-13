import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpclient: HttpClient) { }

  getMembers(memberId):Observable<any[]> {
    return this.httpclient.post<any[]>(`${environment.APIBASEURL}/Neighbor/get_member_neighbors_withfilters`, {
      _member_id: memberId,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    }, Utils.getAuthHeader()).pipe(map(data => data["data"]));
  }

  getUsersChatThreads(emailId) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/myThreads/` + emailId);
  }

  getThreadMessages(threadId) {
    return this.httpclient.get<any[]>(`${environment.BaseUrlChatServer}/getThreadMessages/` + threadId);
  }
}
