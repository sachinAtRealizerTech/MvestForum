import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private httpClient:HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(environment.APIBASEURL+ '/getallcategories')
  }

  
}
