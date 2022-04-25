import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokeService {
  save(value: string) {
    localStorage.setItem("token", value);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
