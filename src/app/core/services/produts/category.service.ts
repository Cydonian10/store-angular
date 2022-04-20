import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, tap } from "rxjs";
import { ICategory } from "@core/interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private url = environment.base_url;
  private categories = new BehaviorSubject<ICategory[]>([]);
  categories$ = this.categories.asObservable();
  constructor(private http: HttpClient) {}

  all() {
    return this.http
      .get<ICategory[]>(`${this.url}/categories`)
      .pipe(tap((categories) => this.categories.next(categories)));
  }
}
