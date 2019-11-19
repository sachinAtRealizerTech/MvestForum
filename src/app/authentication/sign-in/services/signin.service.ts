import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../models/Auth';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  signIn(body) {
    return this.httpClient.post<Auth>(`${environment.APIBASEURL}/MVestUser/login_user`, body, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/signin']);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("currentUser") ? true : false;
  }

}
