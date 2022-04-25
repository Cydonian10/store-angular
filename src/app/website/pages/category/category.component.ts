import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Status } from "@core/interfaces/types.interface";
import { Subject, switchMap, takeUntil } from "rxjs";
import { ProductsService } from "@core/services/produts/products.service";
import { IProduct } from "@core/interfaces/product.interface";

@Component({
  selector: "app-category",
  template: `
    <div class="spinner" *ngIf="status === 'loading'; else renderProducts">
      <app-spinner></app-spinner>
    </div>

    <ng-template #renderProducts>
      <app-grid>
        <app-product-cart *ngFor="let item of products" [product]="item"> </app-product-cart>
      </app-grid>
    </ng-template>
  `,
  styleUrls: ["./category.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  status: Status = "init";
  products: IProduct[] = [];

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProductByCategory();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  /** @fetch de productos por categoria */
  fetchProductByCategory() {
    this.status = "loading";

    this.route.paramMap
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((params) => {
          const id = Number(params.get("id"));
          if (id) return this.productsService.productByCategory(id);
          return [];
        })
      )
      .subscribe({
        next: (products) => this.nextFunction(products),
        error: (e) => console.log(e),
        complete: () => console.log("hola"),
      });
  }

  nextFunction(value: IProduct[]) {
    this.status = "init";
    this.products = value;
  }
}
