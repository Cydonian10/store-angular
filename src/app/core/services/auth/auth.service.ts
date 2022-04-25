import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IAuth } from "@core/interfaces/auth.interface";
import { IUser } from "@core/interfaces/user.interface";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { TokeService } from "../local-storage/toke.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = environment.base_url;
  private userLoageado = new BehaviorSubject<IUser | null>(null);
  userLogueado$ = this.userLoageado.asObservable();

  constructor(private http: HttpClient, private tokeService: TokeService) {}

  login(email: string, password: string) {
    return this.http
      .post<IAuth>(`${this.url}/auth/login`, { email, password })
      .pipe(
        tap(({ access_token }) => this.tokeService.save(access_token)),
        switchMap(() => this.profile())
      );
  }

  profile() {
    return this.http
      .get<IUser>(`${this.url}/auth/profile`)
      .pipe(tap((user) => this.userLoageado.next(user)));
  }

  logaout() {
    localStorage.removeItem("token");
    this.userLoageado.next(null);
  }
}
