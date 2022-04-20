import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { IProduct } from "@core/interfaces/product.interface";
import { CartService } from "@core/services/produts/cart.service";

@Component({
  selector: "app-product-cart",
  template: `
    <app-card>
      <ng-container image>
        <img [src]="product.images[0]" alt="image" />
      </ng-container>
      <ng-container body>
        <div class="flex justify-between">
          <p>{{ product.title }}</p>
          <p>{{ product.price | currency }}</p>
        </div>
      </ng-container>
      <ng-container footer>
        <button [routerLink]="['/product', product.id, product.title]" mat-button>Detalle</button>
        <button (click)="addCart()" mat-icon-button>
          <mat-icon>add_shopping_cart</mat-icon>
        </button>
      </ng-container>
    </app-card>
  `,
  styleUrls: ["./product-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCartComponent {
  @Input() product: IProduct = {} as IProduct;

  constructor(private cartService: CartService) {}

  addCart() {
    this.cartService.addCart({ ...this.product, quantity: 1, total: this.product.price });
  }
}
