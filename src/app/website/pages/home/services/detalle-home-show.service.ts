import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DetalleHomeShowService {
  public show = new BehaviorSubject<boolean>(false);
}
