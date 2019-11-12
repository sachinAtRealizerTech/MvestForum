import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';
import { DiscussionDetails } from 'src/app/models/discussions';

@Injectable({
  providedIn: 'root'
})
export class DiscussiondetailsService {

  constructor(private httpClient: HttpClient) { }

  getAllDiscussionsDetails(discussion_id: string) {
    return this.httpClient.get<DiscussionDetails>(`${environment.APIBASEURL}/discussion/Details/${discussion_id}`, Utils.getAuthHeader()).pipe(map(data => {
      return data
    }))
  }

  sendReply(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/discussion/postreply`, body, Utils.getAuthHeader())
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/discussion`, body, Utils.getAuthHeader())
  }

  commentToPost(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/AddComments`, body, Utils.getAuthHeader())
  }

  postLike(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/AddLikes`, body, Utils.getAuthHeader())
  }


}
