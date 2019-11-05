//import { User } from '../shared/Model/User';
import { Injectable } from '@angular/core';
import { Auth } from '../models/Auth';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor() { }

    private static userKey = 'currentUser';

    public static SetUserInCookies(auth: Auth) {
        localStorage.setItem(this.userKey, JSON.stringify(auth));
    }

    public static GetCurrentUser(): Auth {
        debugger;
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
}