import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private httpClient:HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(environment.APIBASEURL+ '/getallcategories').pipe(map(data=>{
      return data['data']
    }))
  }
}
