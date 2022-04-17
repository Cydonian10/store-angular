import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

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
            <li><a mat-button>Otro</a></li>
          </ul>
        </div>

        <div class="md:hidden order-3">
          <button (click)="toogleShow()" mat-icon-button>
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <div class="postion">
          <p class="hidden md:flex">gabriel</p>
          <p>
            <mat-icon matBadgeSize="small" matBadge="15" matBadgeColor="warn"
              >shopping_cart</mat-icon
            >
          </p>
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
          <li>
            <a
              mat-ripple
              routerLinkActive="active"
              routerLink="/otro"
              class="w-full block py-2 px-2"
              >cambio</a
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
export class NavigationComponent implements OnInit {
  public show = false;
  constructor() {}

  ngOnInit(): void {}

  toogleShow() {
    this.show = !this.show;
  }
}
