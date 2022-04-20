import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "@shared/shared.module";
import { MaterialModule } from "@material/material.module";

import { CardProductComponent } from "./card-product/card-product.component";
import { DetalleHomeComponent } from "./detalle-home/detalle-home.component";

import { SwiperModule } from "swiper/angular";
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, CardProductComponent, DetalleHomeComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule,
    SwiperModule,
  ],
})
export class HomeModule {}
