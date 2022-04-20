import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryComponent } from "./category.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { ProductCartComponent } from "./product-cart/product-cart.component";
import { MaterialModule } from "../../../material/material.module";

const routes: Routes = [{ path: ":id/:categoriaName", component: CategoryComponent }];

@NgModule({
  declarations: [CategoryComponent, ProductCartComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule],
})
export class CategoryModule {}
