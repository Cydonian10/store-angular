import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { ProductsService } from "@core/services/produts/products.service";
import { IProduct } from "@core/interfaces/product.interface";
import { Status } from "@core/interfaces/types.interface";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <div class="spinner" *ngIf="status === 'loading'; else render">
      <app-spinner></app-spinner>
    </div>
    <ng-template #render>
      <app-grid>
        <app-card-product *ngFor="let product of products" [product]="product"> </app-card-product>
      </app-grid>
    </ng-template>
    <app-detalle-home [produtId]="productId"></app-detalle-home>
  `,
  styleUrls: ["./home.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();

  products: IProduct[] = [];
  products$!: Observable<IProduct[]>;
  status: Status = "init";
  productId: string | null = null;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.obtenerProducts();
    this.getQueryParams();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  getQueryParams() {
    this.route.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe((params) => {
      this.productId = params.get("product");
    });
  }

  /** @fectch llamada a enpoint para traer datos */
  fetchProducts(): void {
    this.status = "loading";
    this.productsService.all(10, 0).subscribe({
      next: () => (this.status = "init"),
      error: (e) => console.log(e),
      complete: () => (this.status = "init"),
    });
  }

  /** @obteninedo datos del store */
  obtenerProducts(): void {
    this.productsService.products$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((product) => product.length === 0 && this.fetchProducts()) //llamando a fetch ni no hay productos en el store
      )
      .subscribe((products) => (this.products = products));
  }
}
