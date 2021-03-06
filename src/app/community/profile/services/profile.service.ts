import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { CommunityStats } from '../../models/communitystats'
import { RecentDiscussions } from '../models/recentDiscussions';
import { MyNews } from '../models/myNews';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getCommunityStats(emailId: string) {
    return this.http.get<CommunityStats>(`${environment.APIBASEURL}/Community/GetCommStats/${emailId}`, Utils.getAuthHeader())
  }

  getRecentDiscussionsAndPhotos(emailId: string) {
    return this.http.get(`${environment.APIBASEURL}/Community/Get_recent_disc_and_photos/${emailId}`, Utils.getAuthHeader())
  }

  getMyNews(memberId: number) {
    debugger;
    return this.http.get<MyNews[]>(`${environment.APIBASEURL}/NewsFramework/GetMyNews/${memberId}`, Utils.getAuthHeader())
  }

}
