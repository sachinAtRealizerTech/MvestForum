import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';
import { albumList } from '../models/album';


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
    return this.http.post(`${environment.APIBASEURL}/ImageUpload/AddAlbum`, body, Utils.getAuthHeader())
  }

  getAlbumList(memberId: number) {
    return this.http.get<albumList[]>(`${environment.APIBASEURL}/ImageUpload/GetAlbumList/${memberId}`, Utils.getAuthHeader())
  }

  addPhotoInLeaseOrAlbum(body) {
    return this.http.put(`${environment.APIBASEURL}/ImageUpload/AddPhotos`, body, Utils.getAuthHeader())
  }

  getAlbumPhotos(docId: string) {
    return this.http.get(`${environment.APIBASEURL}/ImageUpload/GetAlbumPhotos/${docId}`)
  }

  uploadPhoto(formdata) {
    return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formdata, Utils.getAuthHeader())
  }

}
