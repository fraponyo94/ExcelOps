import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem("created")) {
      //Remove Item to allow cretion of more
      localStorage.removeItem("created");

      // created in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/"]);
    return false;
  }

}

