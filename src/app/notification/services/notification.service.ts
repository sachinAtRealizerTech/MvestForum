import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getNotificationMasterEntries() {
    return this.httpClient.get(`${environment.APIBASEURL}/MasterData/GetNotificationMasterEntries`, Utils.getAuthHeader())
  }

  getMyNotifications(email: string, feature: string, status: string, type: string) {
    debugger;
    return this.httpClient.get(`${environment.APIBASEURL}/Notifications/GetMyNotifications/${email}/${feature}/${status}/${type}`, Utils.getAuthHeader())
  }

  archievingNotification(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Notifications/ArchieveNotification`, body, Utils.getAuthHeader())
  }

  getMyArchNotification(email: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/Notifications/GetMyArchNotifications/${email}`, Utils.getAuthHeader())
  }

  readNotification(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/notifications/ReadNotification`, body, Utils.getAuthHeader())
  }

}
