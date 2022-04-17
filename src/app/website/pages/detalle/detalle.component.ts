import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewEncapsulation,
} from "@angular/core";
import { of, Subject, switchMap, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../../core/services/produts/products.service";
import { IProduct } from "@core/interfaces/product.interface";
import SwiperCore, { Navigation, FreeMode, Thumbs } from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: "app-detalle",
  template: `
    <div *ngIf="product" class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="order-2 md:order-1">
        <swiper
          style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
          [loop]="true"
          [spaceBetween]="10"
          [navigation]="true"
          [thumbs]="{ swiper: thumbsSwiper }"
          class="mySwiper2"
        >
          <ng-template swiperSlide *ngFor="let image of product.images">
            <img [src]="image" />
          </ng-template>
        </swiper>
        <swiper
          (swiper)="thumbsSwiper = $event"
          [loop]="true"
          [spaceBetween]="10"
          [slidesPerView]="3"
          [freeMode]="true"
          [watchSlidesProgress]="true"
          class="mySwiper"
        >
          <ng-template swiperSlide *ngFor="let image of product.images">
            <img [src]="image" />
          </ng-template>
        </swiper>
      </div>
      <div class="item-detalle-container order-1 md:order-2">
        <div>
          <p class="text-primary font-bold tracking-widest">{{ product.category.name }}</p>
          <h3 class="text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold ">
            {{ product.title }}
          </h3>
          <p class="text-gray-500 leading-tight py-5">{{ product.description }}</p>
          <div class="price">
            <p>{{ product.price | currency }}</p>
          </div>
        </div>
        <!-- ! footer aumentador -->
        <div class="flex space-x-3 pt-5">
          <div class="aumentador">
            <button class="bg-gray-300/30 text-primary text-xl" mat-button>-</button>
            <p class="px-5">0</p>
            <button class="bg-gray-300/30 text-primary text-xl" mat-button>+</button>
          </div>
          <button mat-raised-button class="bg-primary text-white w-48">
            <mat-icon>shopping_cart</mat-icon>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./detalle.component.scss"],
  encapsulation: ViewEncapsulation.None,

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  product: IProduct | null = null;
  thumbsSwiper: any;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getParamsDetalle();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  /**@fetch llamdndo a un solo producto */
  getParamsDetalle() {
    this.route.paramMap
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((params) => {
          const id = params.get("id");
          if (id) return this.productsService.one(Number(id));
          return of(null);
        })
      )
      .subscribe({
        next: (data) => (this.product = data),
      });
  }
}
