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
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/getmasterentities/state`, httpOptions)
  }

  getNotificationPreferencesList() {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/getmasterentities/NotificationPreference`, httpOptions)
  }

  getInterestQuestionAns() {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/PA_QuestionAns`, httpOptions)
  }

  postInterestPrefernce(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/MVestUser/Save_QuestionAnswers`, body, httpOptions)
  }

  postNotificationPrefernece(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/MVestUser/UpdatePreferenceOption`, body, httpOptions)
  }

  planSelectionDataForMineralUser() {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/plan_selection/mineral`, httpOptions)
  }

  planSelectionDataForProfessionalUser() {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/plan_selection/professional`, httpOptions)
  }

  userRegistration(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/MVestUser/userRegistration`, body, httpOptions)
  }

  completeUserRegistration(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/MVestUser/payment_selection`, body, httpOptions)
  }

  sendConfirmationEmail(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/MVestUser/SendConfirmationEmail`, body, httpOptions)
  }

}
