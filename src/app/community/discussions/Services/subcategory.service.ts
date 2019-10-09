import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpClient: HttpClient) { }

  getSubcategory(id: number) {
    return this.httpClient.get(environment.APIBASEURL + 'getsubcategoryById/' + id, httpOptions).pipe(map(data=>{
      return data['data']
    }))
  }
}
