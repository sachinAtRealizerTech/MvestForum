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
export class DiscussiondetailsService {

  constructor(private httpClient: HttpClient) { }

  getAllDiscussionsDetails(discussion_id: string) {
    return this.httpClient.get(environment.APIBASEURL + 'getDiscussion/' + discussion_id, httpOptions).pipe(map(data=>{
      return data['data']
    }))
  }

}
