import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Utils } from 'src/app/shared/Utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MvestUserProfileService {

  constructor(private http: HttpClient) { }

  getMvestUserDetails(id: number) {
    return this.http.get(`${environment.APIBASEURL}/MVestUser/neighbor_profile/${id}`, Utils.getAuthHeader())
  }
}
