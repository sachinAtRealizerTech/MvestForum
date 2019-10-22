import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  getStates() {
    return this.httpClient.get(`${environment.APIBASEURL}/getmasterentities/state`, httpOptions)
  }

  getNotificationPreferencesList() {
    return this.httpClient.get(`${environment.APIBASEURL}/getmasterentities/NotificationPreference`, httpOptions)
  }

  getInterestQuestionAns() {
    return this.httpClient.get(`${environment.APIBASEURL}/PA_QuestionAns`, httpOptions)
  }

  postInterestPrefernce(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/Save_QuestionAnswers`, body, httpOptions)
  }

  postNotificationPrefernece(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/UpdatePreferenceOption`, body, httpOptions)
  }

  planSelectionDataForMineralUser() {
    return this.httpClient.get(`${environment.APIBASEURL}/plan_selection/mineral`, httpOptions)
  }

  planSelectionDataForProfessionalUser() {
    return this.httpClient.get(`${environment.APIBASEURL}/plan_selection/professional`, httpOptions)
  }

  userRegistration(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/userRegistration`, body, httpOptions)
  }

  completeUserRegistration(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/payment_selection`, body, httpOptions)
  }

}
