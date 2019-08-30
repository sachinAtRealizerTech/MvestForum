import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {subcategory} from '../models/subcategory'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

public SelectedSuBcategory:string;

  constructor(private http: HttpClient) { }

  getAllSubcategory(name){
    debugger;
    return this.http.get( environment.APIBASEURL + 'api/getallsubcategory/'+name,httpOptions)
    .pipe(map(subcategory => {
      return subcategory;
    }));
  }

  getSelectedSubCategory(name:string){
          this.SelectedSuBcategory=name;
  }
}
