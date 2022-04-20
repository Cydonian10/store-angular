import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  save(value: any, key: string) {
    let itemGuardar = JSON.stringify(value);
    localStorage.setItem(key, itemGuardar);
  }

  getValue(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
