import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
};

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories() {
    return this.httpClient.get(`${environment.APIBASEURL}/masterData`, Utils.getAuthHeader())
      .pipe(map(data => {
        return data
      }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/discussion`, body, httpOptions)
  }
}
