import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';
import { CategoryList } from '../../../models/category'

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories() {
    return this.httpClient.get<CategoryList[]>(`${environment.APIBASEURL}/masterData`, Utils.getAuthHeader())
      .pipe(map(data => {
        return data
      }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/discussion`, body, Utils.getAuthHeader())
  }
}
