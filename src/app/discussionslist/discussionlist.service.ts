import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DiscussionlistService {

  constructor(private http: HttpClient) { }


  
  getDiscussionList(name){
    return this.http.get( environment.APIBASEURL + 'api/getdiscussionlist/'+name,httpOptions)
    .pipe(map(discussions => {
      return discussions;
    }));
  }
}
