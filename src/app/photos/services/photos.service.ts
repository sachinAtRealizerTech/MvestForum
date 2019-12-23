import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  uploadImage(body) {
    debugger;
    console.log(body)
    return this.http.post(`${environment.APIBASEIMGURL}/upload/post`, body, httpOptions)
  }

  addNewAlbum(body) {
    return this.http.post(`${environment.APIBASEIMGURL}/ImageUpload/AddAlbum`, body, httpOptions)
  }

  getAlbumList(email_id: string) {
    return this.http.get(`${environment.APIBASEIMGURL}/ImageUpload/GetAlbumList/${email_id}`, Utils.getAuthHeader())
  }


}
