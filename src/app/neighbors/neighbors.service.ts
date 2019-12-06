import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class NeighborsService {

  constructor(private httpclient: HttpClient) { }

  getMyLease(emailId: string) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbors/GetMyLeases/${emailId}`, Utils.getAuthHeader())
  }

  getLeaseNeighbors(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbors/GetLeaseNeighbors`, body, Utils.getAuthHeader())
  }

  getMyConnectRequests(emailId: string) {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbors/GetMYConnectRequests/${emailId}`, Utils.getAuthHeader())
  }

  acceptConnectRequest(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbors/AcceptNeighborReq`, body, Utils.getAuthHeader())
  }

  getLeaseOwners(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbors/GetLeaseOwners`, body, Utils.getAuthHeader())
  }

  sendConnectRequest(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbors/ConnectNeighbor`, body, Utils.getAuthHeader())
  }

}
