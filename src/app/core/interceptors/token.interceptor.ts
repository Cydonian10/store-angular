import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokeService } from "../services/local-storage/toke.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokeService: TokeService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokeService.getToken();
    if (token) {
      const auhtRequest = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
      return auhtRequest;
    }
    return request;
  }
}
