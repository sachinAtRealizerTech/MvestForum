import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/shared/Utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MydiscussionsService {

  constructor(private httpClient: HttpClient) { }

  getMyDiscussionGroups(emailId: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/discussion/GetMyDiscussionGroups/${emailId}`, Utils.getAuthHeader())
  }

  editMyDiscussionGroupOrder(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/OrderMyDiscussionGroups`, body, Utils.getAuthHeader())
  }
}
