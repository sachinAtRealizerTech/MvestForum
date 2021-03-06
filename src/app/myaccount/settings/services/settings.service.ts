import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../../../shared/Utils';
import { UserNotificationOptions } from '../models/notificationOptions';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient: HttpClient) { }

  getNotificationOptions(body) {
    return this.httpClient.post<UserNotificationOptions[]>(`${environment.APIBASEURL}/Notifications/GetMyNotificationOptions`, body, Utils.getAuthHeader())
  }

  saveNotificationOptions(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Notifications/SaveNotificationOptions`, body, Utils.getAuthHeader())
  }

  getMyNotificationPreferences(email: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/GetMyNotificationPreferences/${email}`, Utils.getAuthHeader())
  }


}
