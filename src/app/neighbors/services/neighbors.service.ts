import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_neighbor_listdetails/${listId}/${userId}`, Utils.getAuthHeader())
  }

  saveNeighborList(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/saveneblist`, body, Utils.getAuthHeader())
  }

  getCountiesAndOperators() {
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/get_countiesnoperators/`, Utils.getAuthHeader())
  }

  getMemberNeighborsWithFilter(body) {
    return this.httpclient.post(`${environment.APIBASEURL}/Neighbor/get_member_neighbors_withfilters`, body, Utils.getAuthHeader())
  }

  getNeighborListByMemberId(id:number):Observable<any[]>{
    return this.httpclient.get(`${environment.APIBASEURL}/Neighbor/getmemberneighborlistdtls/${id}`,Utils.getAuthHeader())
    .pipe(map(list=>{
      //we are doing grouping here because api not return grouped data
      //we will change this when api return data in correct format
      const obj = Utils.groupBy(list["data"],"list_name");
      let array:{name:string,member:any}[]=[];
      for (var prop in obj) 
      {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) 
        {
          array.push({name:prop,member:obj[prop]})
        }
      }
      return array;
    }))
  }

}
