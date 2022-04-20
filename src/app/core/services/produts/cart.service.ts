import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { ICartItem } from "@core/interfaces/product.interface";
import { ProductsService } from "./products.service";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = new BehaviorSubject<ICartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.cartItems.next(this.localStorage.getValue("cart") || []);
  }

  addCart(cart: ICartItem, aumentador: number = 1) {
    const product = this.cartItems.value.find((item) => item.id === cart.id);

    if (product) {
      this.cartItems.next(
        this.cartItems.value.map((item) => {
          if (item.id === product.id) {
            item = {
              ...item,
              quantity: item.quantity + aumentador,
              total: (item.quantity + aumentador) * item.price,
            };
          }
          return item;
        })
      );
    } else {
      this.cartItems.next([...this.cartItems.value, { ...cart, quantity: 1 }]);
    }

    this.localStorage.save(this.cartItems.value, "cart");
  }

  removeOneFromCart(id: number) {
    const itemToDelete = this.cartItems.value.find((item) => item.id === id);
    itemToDelete!.quantity > 1
      ? this.cartItems.next(
          this.cartItems.value.map((item) => {
            if (item.id === id) {
              item = {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price,
              };
            }
            return item;
          })
        )
      : this.cartItems.next([...this.cartItems.value.filter((item) => item.id !== id)]);

    this.localStorage.save(this.cartItems.value, "cart");
  }

  deleteItemFromCart(id: number) {
    const filter = this.cartItems.value.filter((item) => item.id !== id);
    this.cartItems.next(filter);
    this.localStorage.save(this.cartItems.value, "cart");
  }

  amauntCart() {
    const total = this.cartItems.value.reduce((sum, item) => item.price * item.quantity + sum, 0);
    return total;
  }
}
