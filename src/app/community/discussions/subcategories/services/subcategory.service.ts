import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';
import { SubCategoryList } from '../../../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpClient: HttpClient) { }

  getSubcategory(id: string) {
    return this.httpClient.get<SubCategoryList[]>(`${environment.APIBASEURL}/MasterData/subcategory/${id}`, Utils.getAuthHeader()).pipe(map(data => {
      return data
    }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/Discussion`, body, Utils.getAuthHeader())
  }

  addSubcategoryToMyDiscussions(body) {
    return this.httpClient.put(`${environment.APIBASEURL}/Discussion/MyDiscussionGroup`, body, Utils.getAuthHeader())
  }

}
