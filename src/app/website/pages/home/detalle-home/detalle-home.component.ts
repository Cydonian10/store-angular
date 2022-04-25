import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { DetalleHomeShowService } from "../services/detalle-home-show.service";
import { ProductsService } from "@core/services/produts/products.service";
import { IProduct } from "@core/interfaces/product.interface";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

SwiperCore.use([Navigation, Pagination]);

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
          <swiper
            [slidesPerView]="1"
            [navigation]="true"
            [pagination]="{ clickable: true }"
            [loop]="true"
            [spaceBetween]="50"
          >
            <ng-template swiperSlide *ngFor="let image of product.images">
              <img appImageError [src]="image" alt="" />
            </ng-template>
          </swiper>
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
    this.productsService.one(id).subscribe((product) => {
      this.product = product;
    });
  }

  /**@cerrar modal */
  closeDetalle() {
    this.showDetalle.show.next(false);
  }
}
