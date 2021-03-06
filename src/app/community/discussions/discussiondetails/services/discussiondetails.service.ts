import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';
import { DiscussionDetails } from '../../../models/discussiondetails';

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

  postDislike(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/DisLikes`, body, Utils.getAuthHeader())
  }

  markAsAnswer(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/MarkAsAnswer`, body, Utils.getAuthHeader())
  }

  editPost(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/EditPost`, body, Utils.getAuthHeader())
  }

  deletePost(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/DeletePost`, body, Utils.getAuthHeader())
  }

  reportAbuse(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/ReportAbuse/report_abusedpost`, body, Utils.getAuthHeader())
  }

}
