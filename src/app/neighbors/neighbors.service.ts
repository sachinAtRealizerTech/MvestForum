import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class NeighborsService {

  constructor(private httpclient:HttpClient) { }

  Getlease(emailId: string){
return this.httpclient.get(`${environment.APIBASEURL}/Neighbors/GetMyLeases/${emailId}`,Utils.getAuthHeader())
  }
}
