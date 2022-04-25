import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { CartService } from "../../../core/services/produts/cart.service";
import { map, Observable, Subject, takeUntil, tap, switchMap } from "rxjs";
import { ICartItem } from "@core/interfaces/product.interface";
import { CategoryService } from "../../../core/services/produts/category.service";
import { ICategory } from "@core/interfaces/category.interface";
import { AuthService } from "../../../core/services/auth/auth.service";
import { IUser } from "../../../core/interfaces/user.interface";
import { Router } from "@angular/router";

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
          <ng-container *ngIf="userLogeado | async as user; else renderLogin">
            <div class="relative">
              <p (click)="showSettings = !showSettings" class="hidden md:flex">
                {{ user.name | titlecase }}
                <mat-icon>expand_more</mat-icon>
              </p>
              <div
                class="absolute hidden w-40 h-24 right-1 top-7 p-3 bg-white shadow-lg rounded-md z-50 "
                [class.showSetting]="showSettings"
              >
                <button [routerLink]="['/profile']" class="w-full text-primary " mat-button>
                  <mat-icon>settings </mat-icon>
                  Profile
                </button>
                <button class="w-full text-red-500 " (click)="logaout()" mat-button>
                  <mat-icon>logout</mat-icon>
                  Cerrar Sesion
                </button>
              </div>
            </div>
          </ng-container>
          <ng-template #renderLogin>
            <button mat-button [routerLink]="['/auth', 'login']">Login</button>
          </ng-template>

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
              class="w-full block py-2 px-2"
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

          <div class="absolute bottom-0 w-56">
            <ng-container *ngIf="userLogeado | async as user; else renderLogout">
              <p class="p-2" mat-ripple>{{ user.name }}</p>
              <a
                mat-ripple
                routerLinkActive="active"
                routerLink="/profile"
                class="w-full block py-2 px-2"
                >Profile</a
              >
              <button mat-button (click)="logaout()" class="w-full block py-2 px-2  text-red-500">
                Logout
              </button>
            </ng-container>
            <ng-template #renderLogout>
              <button
                mat-stroked-button
                routerLink="/auth/login"
                class="w-full block py-2 px-2 text-white mb-3"
              >
                Login
              </button>
            </ng-template>
          </div>
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
  public showSettings = false;
  cartItems!: Observable<ICartItem[]>;
  userLogeado!: Observable<IUser | null>;

  constructor(
    private cartService: CartService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}
  categories: ICategory[] = [];

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems$;

    /** Obeteneindo al user loageado */
    this.userLogeado = this.authService.userLogueado$;

    /** Obteniendo categorias */
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

  /**@logaout de la pagina */
  logaout() {
    this.authService.logaout();
    this.router.navigateByUrl("/");
  }
}
