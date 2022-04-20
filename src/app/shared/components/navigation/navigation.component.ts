import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { CartService } from "../../../core/services/produts/cart.service";
import { map, Observable, Subject, takeUntil, tap, switchMap } from "rxjs";
import { ICartItem } from "@core/interfaces/product.interface";
import { CategoryService } from "../../../core/services/produts/category.service";
import { ICategory } from "@core/interfaces/category.interface";

@Component({
  selector: "app-navigation",
  template: `
    <header>
      <div class="wrapper-header">
        <div class="postion">
          <div class="mr-4">
            <img src="favicon.ico" alt="logo" />
          </div>
          <ul class="hidden md:flex">
            <li><a routerLinkActive="active" routerLink="/home" mat-button>Home</a></li>
            <li *ngFor="let category of categories">
              <a
                mat-button
                routerLinkActive="active"
                [routerLink]="['/categories', category.id, category.name]"
                class="w-full block py-2 px-2"
                >{{ category.name }}</a
              >
            </li>
          </ul>
        </div>

        <div class="md:hidden order-3">
          <button (click)="toogleShow()" mat-icon-button>
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <div class="postion">
          <p class="hidden md:flex">gabriel</p>
          <button mat-button [routerLink]="['/auth', 'login']">Login</button>
          <button mat-icon-button routerLink="/cart">
            <mat-icon
              matBadgeSize="small"
              [matBadge]="(cartItems | async)?.length"
              matBadgeColor="warn"
              >shopping_cart</mat-icon
            >
          </button>
        </div>
      </div>
    </header>

    <div (click)="toogleShow()" class="pantalla-negra" [class.active]="show"></div>

    <!-- ******************************* -->
    <!-- * mobile * -->
    <nav [class.active]="show">
      <div class="container-nav">
        <!-- ******************************* -->
        <!-- * header-mobile * -->
        <div class="flex h-14 items-center space-x-3">
          <img src="favicon.ico" alt="log" />
          <p>Store</p>
        </div>
        <mat-divider class="py-3"></mat-divider>
        <ul>
          <li>
            <a
              mat-ripple
              routerLinkActive="active"
              routerLink="/home"
              class="active w-full block py-2 px-2"
              >Home</a
            >
          </li>
          <li *ngFor="let category of categories">
            <a
              mat-ripple
              routerLinkActive="active"
              [routerLink]="['/categories', category.id, category.name]"
              class="w-full block py-2 px-2"
              >{{ category.name }}</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <div class="container m-auto py-1 px-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ["./navigation.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  public show = false;
  cartItems!: Observable<ICartItem[]>;

  constructor(private cartService: CartService, private categoryService: CategoryService) {}
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems$;
    this.obtenerCategories();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  /**@fetch categoies */

  /** @fectch llamada a enpoint para traer datos */
  fetchCategories(): void {
    this.categoryService.all().subscribe();
  }

  /** @obteninedo datos del store */
  obtenerCategories(): void {
    this.categoryService.categories$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((categories) => categories.length === 0 && this.fetchCategories()) //llamando a fetch ni no hay productos en el store
      )
      .subscribe((categories) => (this.categories = categories));
  }

  toogleShow() {
    this.show = !this.show;
  }
}
