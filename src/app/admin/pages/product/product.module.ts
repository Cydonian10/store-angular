import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product.component";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "../../../material/material.module";

const routes: Routes = [{ path: "", component: ProductComponent }];

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class ProductModule {}
