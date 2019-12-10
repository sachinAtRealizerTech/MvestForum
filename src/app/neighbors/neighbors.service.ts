import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class NeighborsService {

  constructor(private httpclient: HttpClient) { }

  getMyLease(Id: number) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/getmyleases/${Id}`, Utils.getAuthHeader())
  }

  getLeaseNeighbors(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/getleaseneighbors`, body, Utils.getAuthHeader())
  }

  getMyConnectRequests(Id: number) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_my_connectrequests/${Id}`, Utils.getAuthHeader())
  }

  acceptConnectRequest(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/acceptIgnore_req`, body, Utils.getAuthHeader())
  }

  getLeaseOwnersWithConnect(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/getleasownerswithconnectstatus`, body, Utils.getAuthHeader())
  }

  sendConnectRequest(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/connect_neighbors`, body, Utils.getAuthHeader())
  }

  getMemberNeighbors(Id: number) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_member_neighbors/${Id}`, Utils.getAuthHeader())
  }

  getMemberList(Id: number) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_member_list/${Id}`, Utils.getAuthHeader())
  }

  getNeighborsListDetails(listId: number, userId: number) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_member_list/${listId}/${userId}`, Utils.getAuthHeader())
  }

}
