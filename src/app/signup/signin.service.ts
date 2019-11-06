import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../models/Auth';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  signIn(body) {
    return this.httpClient.post<Auth>(`${environment.APIBASEURL}/MVestUser/login_user`, body, httpOptions).pipe(map(data => {
      if (data['data'] && data['data'].token) {
        // store user details and jwt token in session storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(data['data']));
      }
      return data;
    }));
  }



}
