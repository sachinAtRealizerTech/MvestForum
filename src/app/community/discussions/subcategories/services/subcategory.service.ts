import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/Utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpClient: HttpClient) { }

  getSubcategory(id: string) {
    return this.httpClient.get(`${environment.APIBASEURL}/MasterData/subcategory/${id}`).pipe(map(data => {
      return data
    }))
  }

  postQuestion(body) {
    return this.httpClient.post(`${environment.APIBASEURL}/Discussion`, body, Utils.getAuthHeader())
  }

}
