import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { CommunityStats } from '../../models/communitystats'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getCommunityStats(emailId: string) {
    return this.http.get<CommunityStats>(`${environment.APIBASEURL}/Community/GetCommStats/${emailId}`, Utils.getAuthHeader())
  }

}
