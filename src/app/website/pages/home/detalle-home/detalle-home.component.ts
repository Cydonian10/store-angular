import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from "@angular/core";
import { Observable, switchMap, Subject, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { DetalleHomeShowService } from "@website/services/detalle-home-show.service";
import { ProductsService } from "@core/services/produts/products.service";
import { IProduct } from "@core/interfaces/product.interface";

@Component({
  selector: "app-detalle-home",
  template: `
    <div
      (click)="closeDetalle()"
      class="pantalla-negra hidden sm:block"
      [class.active]="show | async"
    ></div>

    <!-- ******************************* -->
    <!-- * mobile * -->
    <nav class="active hidden sm:block" [class.active]="show | async">
      <div class="container-nav ">
        <!-- ******************************* -->
        <!-- * header-mobile * -->
        <div class="flex h-14 items-center space-x-3">
          <img src="favicon.ico" alt="log" />
          <p>Store</p>
        </div>
        <mat-divider class="py-3"></mat-divider>
        <div *ngIf="product" class="p-4">
          <p>{{ product.id }}</p>
          <img [src]="product.images[0]" alt="" />
        </div>
      </div>
    </nav>
  `,
  styleUrls: ["./detalle-home.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleHomeComponent {
  show: Observable<boolean>;
  product: IProduct | null = null;

  @Input() set produtId(id: string | null) {
    id && this.fetchProduct(Number(id));
  }
  constructor(
    private showDetalle: DetalleHomeShowService,
    private productsService: ProductsService
  ) {
    this.show = this.showDetalle.show;
  }

  fetchProduct(id: number) {
    this.showDetalle.show.next(true);
    this.productsService.one(id).subscribe((resp) => {
      this.product = resp;
    });
  }

  /**@cerrar modal */
  closeDetalle() {
    this.showDetalle.show.next(false);
  }
}
