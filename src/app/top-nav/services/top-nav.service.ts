import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {

  constructor(private httpClient: HttpClient) { }

  getNotificationMasterEntries() {
    return this.httpClient.get(`${environment.APIBASEURL}/MasterData/GetNotificationMasterEntries`, Utils.getAuthHeader())
  }

  getMyNotifications(email: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/Notifications/GetMyNotifications/${email}/All/All/Info`, Utils.getAuthHeader())
  }

  getSearchResult(id: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/SearchFramework/GetsearchResult/${id}`, Utils.getAuthHeader())
  }
}
