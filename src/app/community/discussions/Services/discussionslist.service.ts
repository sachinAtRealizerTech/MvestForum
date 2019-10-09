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

  getAllDiscussionsList(subcategory_id: number) {
    return this.httpClient.get(environment.APIBASEURL + 'getalldiscussions/' + subcategory_id, httpOptions).pipe(map(data=>{
      return data['data']
    }))
  }

  postQuestion(body: any) {
    return this.httpClient.post(environment.APIBASEURL + '', httpOptions);
  }

}
