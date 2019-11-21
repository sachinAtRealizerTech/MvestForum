import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/Utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

  constructor(private httpClient: HttpClient) { }

  getUserProfileDetails(email: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/MVestUser/GetUserProfile/${email}`, Utils.getAuthHeader()).pipe(map(data => {
      return data['data']
    }))
  }

  updateUserProfile(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/MVestUser/UpdateUserProfile`, body, Utils.getAuthHeader())
  }

}
