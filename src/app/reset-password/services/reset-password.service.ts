import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }

  generatePasswordResetToken(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/MVestUser/GenerateResetPassowrdToken`, body, Utils.getAuthHeader())
  }

  resetPassword(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/MVestUser/ResetPassword`, body, Utils.getAuthHeader())
  }
}
