import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private httpClient:HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(environment.APIBASEURL+ '/getallcategories')
  }
}
