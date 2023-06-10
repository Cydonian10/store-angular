import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { IProduct } from "@core/interfaces/product.interface";
import { DetalleHomeShowService } from "../services/detalle-home-show.service";
import { CartService } from "@core/services/produts/cart.service";

@Component({
  selector: "app-card-product",
  template: `
    <app-card>
      <ng-container image>
        <img
          appImageError
          (click)="openDetalle()"
          [src]="product.images[0]"
          alt="image"
          routerLink="."
          [queryParams]="{ product: product.id, title: product.title }"
        />
      </ng-container>
      <ng-container body>
        <div class="flex justify-between">
          <p>{{ product.title }}</p>
          <p>{{ product.price | currency }}</p>
        </div>
      </ng-container>
      <ng-container footer>
        <button [routerLink]="['/product', product.id, product.title]" class="primary">Detalle</button>
        <button (click)="addCart()" mat-icon-button>
          <mat-icon>add_shopping_cart</mat-icon>
        </button>
      </ng-container>
    </app-card>
  `,
  styleUrls: ["./card-product.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit {
  image = "https://www.w3schools.com/howto/img_avatar.png";
  @Input() product: IProduct = {} as IProduct;

  constructor(private showDetalle: DetalleHomeShowService, private cartService: CartService) {}

  ngOnInit(): void {}

  /**@open detalle */
  openDetalle() {
    this.showDetalle.show.next(true);
  }

  /**@cart add cart */
  addCart() {
    this.cartService.addCart({ ...this.product, quantity: 1, total: this.product.price });
  }
}
