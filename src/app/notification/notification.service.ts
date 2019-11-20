import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getNotificationMasterEntries() {
    return this.httpClient.get(`${environment.APIBASEURL}/MasterData/GetNotificationMasterEntries`, Utils.getAuthHeader())
  }

  getMyNotifications(email: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/Notifications/GetMyNotifications/${email}/All/Unread/Info`, Utils.getAuthHeader())
  }
}
