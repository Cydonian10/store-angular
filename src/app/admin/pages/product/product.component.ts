import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ProductsService } from "@core/services/produts/products.service";
import { Subject, takeUntil, tap } from "rxjs";
import { IProduct } from "@core/interfaces/product.interface";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-product",
  template: `
    <div class="py-4">
      <button mat-raised-button>
        <mat-icon>create</mat-icon>
        Añadir producto
      </button>
    </div>
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="products">
        <!-- Position Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Id</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let element">{{ element.title }}</td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Image</th>
          <td class="flex justify-center" mat-cell *matCellDef="let element">
            <img class="" [src]="element.images[0]" width="100" alt="" />
          </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef>Price</th>
          <td mat-cell *matCellDef="let element">{{ element.price }}</td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let element">{{ element.category.name }}</td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button><mat-icon>update</mat-icon></button>
            <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        [length]="200"
        [pageSize]="limit"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
        (page)="pagination($event)"
      >
      </mat-paginator>
    </div>
  `,
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private onDestroy$ = new Subject<true>();
  public products: IProduct[] = [];
  public displayedColumns: string[] = ["id", "name", "image", "price", "category", "acciones"];
  public offset = 0;
  public limit = 5;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.obtenerProducts();
  }

  ngOnDestroy(): void {}

  fetchProducts() {
    this.productsService.all(this.limit, this.offset).subscribe();
  }

  obtenerProducts(): void {
    this.productsService.products$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((product) => product.length === 0 && this.fetchProducts()) //llamando a fetch ni no hay productos en el store
      )
      .subscribe((products) => (this.products = products));
  }

  pagination(e: PageEvent) {
    this.limit = e.pageSize;
    this.offset = e.pageIndex * this.limit;

    this.productsService.all(this.limit, this.offset).subscribe({
      next: (resp) => console.log("object"),
      error: (e) => console.log(e),
      complete: () => console.log("object"),
    });
  }
}
