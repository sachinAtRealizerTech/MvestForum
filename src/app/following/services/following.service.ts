import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers, FollowRequest } from 'src/app/community/models/followingMembers';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(private http: HttpClient) { }

  getFollowingMembers(id: number) {
    return this.http.get<FollowingMembers[]>(`${environment.APIBASEURL}/Followers/get_following/${id}`, Utils.getAuthHeader())
  }

  getFollowerMembers(id: number) {
    return this.http.get<FollowerMembers[]>(`${environment.APIBASEURL}/Followers/get_followers/${id}`, Utils.getAuthHeader())
  }

  getMyFollowRequest(id: number) {
    return this.http.get<FollowRequest[]>(`${environment.APIBASEURL}/Followers/get_follow_requests/${id}`, Utils.getAuthHeader())
  }

  acceptOrIgnoreFollowRequest(body) {
    return this.http.post(`${environment.APIBASEURL}/Followers/AcceptIgnoreFollowRequests`, body, Utils.getAuthHeader())
  }



}
