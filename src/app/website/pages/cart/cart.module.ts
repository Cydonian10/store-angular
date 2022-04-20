import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../../../material/material.module";

const routes: Routes = [{ path: "", component: CartComponent }];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class CartModule {}
