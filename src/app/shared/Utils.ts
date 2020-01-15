//import { User } from '../shared/Model/User';
import { Injectable } from '@angular/core';
import { Auth, userProfile } from '../models/Auth';
import { HttpHeaders } from '@angular/common/http';
import { observable, Subject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor() { }

    // private userDetailsObs = new Subject<userProfile>();

    private static userKey = 'currentUser';

    private static userDetails = 'currentUserProfile'

    public static SetUserInCookies(auth: Auth) {
        localStorage.setItem(this.userKey, JSON.stringify(auth));
    }

    public static GetCurrentUser(): Auth {
        return localStorage.getItem(this.userKey) ? JSON.parse(localStorage.getItem(this.userKey)) : null;
    }

    public static ClearUserSession() {
        localStorage.removeItem(this.userKey);
    }

    public static GetAccessToken(): string {
        let user = this.GetCurrentUser();
        return user ? user['token'] : null;
    }

    // public static GetUserRole(): string {
    //     let user = this.GetCurrentUser();
    //     return user ? user.roles : null;
    // }

    public static getAuthHeader() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Utils.GetAccessToken()}`
            })
        };
        return httpOptions
    }
    public static groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    // getUserDetails(): Observable<userProfile> {
    //     this.userDetailsObs=
    //     return this.userDetailsObs.asObservable();
    // }

    // public static getCurrentUserProfileDetails(): userProfile {
    //     debugger;
    //     return localStorage.getItem(this.userDetails) ? JSON.parse(localStorage.getItem(this.userDetails)) : null;

    // }

}