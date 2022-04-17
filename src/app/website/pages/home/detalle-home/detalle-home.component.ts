import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from "@angular/core";
import { DetalleHomeShowService } from "../../../services/detalle-home-show.service";
import { Observable, switchMap, Subject, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../../../core/services/produts/products.service";
import { IProduct } from "../../../../core/interfaces/product.interface";

@Component({
  selector: "app-detalle-home",
  template: `
    <div (click)="closeDetalle()" class="pantalla-negra" [class.active]="show | async"></div>

    <!-- ******************************* -->
    <!-- * mobile * -->
    <nav class="active" [class.active]="show | async">
      <div class="container-nav ">
        <!-- ******************************* -->
        <!-- * header-mobile * -->
        <div class="flex h-14 items-center space-x-3">
          <img src="favicon.ico" alt="log" />
          <p>Store</p>
        </div>
        <mat-divider class="py-3"></mat-divider>
        <div>
          <img [src]="product.images[0]" alt="" />
        </div>
      </div>
    </nav>
  `,
  styleUrls: ["./detalle-home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleHomeComponent implements OnInit, OnDestroy {
  show: Observable<boolean>;
  onDestroy$ = new Subject<boolean>();
  product!: IProduct;
  @Input() set produtId(value: string | null) {
    console.log(value);
    if (value) {
      this.fetchProduct(Number(value));
    }
  }

  constructor(
    private showDetalle: DetalleHomeShowService,
    private productsService: ProductsService
  ) {
    this.show = this.showDetalle.show;
  }

  ngOnInit(): void {
    // this.getQueryParams();
    // this.fetchProduct();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  fetchProduct(id: number) {
    this.productsService.one(id).subscribe((resp) => {
      console.log(resp);
      this.product = resp;
    });
  }

  /**@cerrar modal */
  closeDetalle() {
    this.showDetalle.show.next(false);
  }
}
