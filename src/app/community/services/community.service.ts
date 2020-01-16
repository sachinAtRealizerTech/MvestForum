import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  onUploadFile(selectedFile) {
    debugger;
    return this.http.post(`${environment.APIBASEIMGURL}/upload/post`, selectedFile, {
      reportProgress: true,
      observe: 'events'
    })
  }

  updateCoverPhoto(body) {
    return this.http.put(`${environment.APIBASEURL}/MVestUser/UpdateMemberBackgroundImage`, body, Utils.getAuthHeader())
  }
}
