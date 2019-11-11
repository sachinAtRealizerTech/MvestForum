import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';
import { DiscussionsList } from '../../../../models/discussions'

@Injectable({
  providedIn: 'root'
})
export class DiscussionslistService {

  constructor(private httpClient: HttpClient) { }

  getAllDiscussionsList(subcategoryId: string) {
    return this.httpClient.get<DiscussionsList[]>(`${environment.APIBASEURL}/discussion/${subcategoryId}`, Utils.getAuthHeader()).pipe(map(data => {
      return data
    }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/discussion`, body, Utils.getAuthHeader())
  }


}
