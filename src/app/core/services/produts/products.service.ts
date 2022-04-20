import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { IProduct } from "@core/interfaces/product.interface";
import { BehaviorSubject, take, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private baseUrl = environment.base_url;
  private _products = new BehaviorSubject<IProduct[]>([]);
  products$ = this._products.asObservable();

  get product() {
    return this._products.value;
  }

  constructor(private http: HttpClient) {}

  all(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set("limit", limit);
      params = params.set("offset", offset);
    }

    return this.http
      .get<IProduct[]>(`${this.baseUrl}/products`, { params })
      .pipe(
        take(3),
        tap((products) => this._products.next([...products]))
      );
  }

  one(id: number) {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`).pipe(take(3));
  }

  productByCategory(id: number) {
    return this.http.get<IProduct[]>(`${this.baseUrl}/categories/${id}/products`);
  }
}
