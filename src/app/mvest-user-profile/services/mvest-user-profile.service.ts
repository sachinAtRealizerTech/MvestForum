import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Utils } from 'src/app/shared/Utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MvestUserProfileService {

  constructor(private http: HttpClient) { }

  getMvestUserDetails(body) {
    return this.http.post(`${environment.APIBASEURL}/MVestUser/neighbor_profile`, body, Utils.getAuthHeader())
  }
}
