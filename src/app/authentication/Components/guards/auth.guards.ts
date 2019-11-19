
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SigninService } from '../../sign-in/services/signin.service'
import { SignInComponent } from '../../sign-in/components/sign-in.component';
import { Utils } from 'src/app/shared/Utils';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: SigninService, private router: Router) { }

    public user = Utils.GetCurrentUser()

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.loginService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!this.loginService.isAuthenticated()) {
                    this.router.navigate(['/signin']);
                    return false;
                }
                return true;
            })
        );
    }

}