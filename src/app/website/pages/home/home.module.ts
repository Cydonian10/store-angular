import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { CardProductComponent } from "./card-product/card-product.component";
import { MaterialModule } from "@material/material.module";
import { DetalleHomeComponent } from './detalle-home/detalle-home.component';

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, CardProductComponent, DetalleHomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule],
})
export class HomeModule {}
