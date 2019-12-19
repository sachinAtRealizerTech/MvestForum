import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utils } from '../../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor(private http: HttpClient) { }

  getBookmarks(emailId: string) {
    return this.http.get(`${environment.APIBASEURL}/Community/GetBookmarks/${emailId}`, Utils.getAuthHeader())
  }

  bookmarkDiscussion(body) {
    return this.http.post(`${environment.APIBASEURL}/Community/BookmarkDiscussion`, body, Utils.getAuthHeader())
  }

  removeBookmark(body) {
    return this.http.put(`${environment.APIBASEURL}/Community/RemoveBookmark`, body, Utils.getAuthHeader())
  }

}
