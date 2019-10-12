import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiscussionslistService {

  constructor(private httpClient: HttpClient) { }

  getAllDiscussionsList(subcategory_id: string) {
    return this.httpClient.get(environment.APIBASEURL + '/Discussion/' + subcategory_id, httpOptions).pipe(map(data=>{
      return data
    }))
  }

  postQuestion(body){
    return this.httpClient.post(environment.APIBASEURL+'/Discussion',body,httpOptions)
  }

}
