import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { CartService } from "@core/services/produts/cart.service";
import { ICartItem } from "@core/interfaces/product.interface";

@Component({
  selector: "app-cart",
  template: `
    <h3>Cesta</h3>
    <p>{{ (itemsCart | async)?.length + " " + "items en la cesta" }}</p>
    <div class="grid-cart">
      <div class="items col-span-3 ">
        <ng-container *ngIf="itemsCart | async as items">
          <ul class="item" *ngFor="let item of items">
            <figure>
              <img [src]="item.images[0]" alt="logo" />
            </figure>
            <div class="text-gray-400">
              <p class="font-bold text-gray-700">{{ item.title }}</p>
              <p class="text-xs">{{ item.description }}</p>
              <p>{{ item.quantity }}</p>
            </div>
            <div class="justify-self-end cursor-pointer">
              <a (click)="deleteItemCart(item.id)" class="text-primary">Eliminar</a>
            </div>
            <div class="flex gap-3">
              <p>{{ item.price | currency }}</p>
              <mat-icon class="text-primary">sell</mat-icon>
            </div>
          </ul>
        </ng-container>
      </div>
      <div class="md:col-span-2">
        <p class="pb-4">Total:</p>
        <p class="text-4xl text-primary font-bold mb-4">{{ totalPrice | currency }}</p>
        <button mat-raised-button class="primary w-full h-14 rounded-sm">Pagar</button>
      </div>
    </div>
  `,
  styleUrls: ["./cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  itemsCart!: Observable<ICartItem[]>;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.itemsCart = this.cartService.cartItems$;
    this.totalAmount();
  }

  totalAmount() {
    this.totalPrice = this.cartService.amauntCart();
  }

  deleteItemCart(id: number) {
    this.cartService.deleteItemFromCart(id);
  }
}
