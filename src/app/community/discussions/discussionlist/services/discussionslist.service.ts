import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiscussionslistService {

  constructor(private httpClient: HttpClient) { }

  getAllDiscussionsList(subcategoryId: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/discussion/${subcategoryId}`, Utils.getAuthHeader()).pipe(map(data => {
      return data
    }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/discussion`, body, Utils.getAuthHeader())
  }


}
