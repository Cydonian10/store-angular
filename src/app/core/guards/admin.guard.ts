import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, map } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  redirec(flag: boolean) {
    if (!flag) {
      this.router.navigateByUrl("/auth/login");
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userLogueado$.pipe(
      map((user) => {
        if (user && user.role === "admin") {
          return true;
        }
        this.redirec(!!user);
        return false;
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userLogueado$.pipe(
      map((user) => {
        if (user && user.role === "admin") {
          return true;
        }
        this.redirec(!!user);
        return false;
      })
    );
  }
}
