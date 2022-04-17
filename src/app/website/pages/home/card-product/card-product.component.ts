import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { IProduct } from "@core/interfaces/product.interface";
import { DetalleHomeShowService } from "../services/detalle-home-show.service";

@Component({
  selector: "app-card-product",
  template: `
    <app-card>
      <ng-container image>
        <img
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
        <button [routerLink]="['/product', product.id, product.title]" mat-button>Detalle</button>
        <button mat-icon-button>
          <mat-icon>add_shopping_cart</mat-icon>
        </button>
      </ng-container>
    </app-card>
  `,
  styleUrls: ["./card-product.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit {
  image = "https://www.w3schools.com/howto/img_avatar.png";
  @Input() product: IProduct = {} as IProduct;

  constructor(private showDetalle: DetalleHomeShowService) {}

  ngOnInit(): void {}

  /**@open detalle */
  openDetalle() {
    this.showDetalle.show.next(true);
  }
}
