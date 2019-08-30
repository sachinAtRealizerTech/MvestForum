import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators'; 
import {Category} from '../models/category'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  public Name:string;
  // private categoryName = new BehaviorSubject(this.Name);
  // selectedcategoryName = this.categoryName.asObservable();


  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get( environment.APIBASEURL + 'api/getallcategories',httpOptions)
    .pipe(map(category => {
      return category;
    }));
  }

  getCategoryName(name){
      this.Name=name;
  }
}
