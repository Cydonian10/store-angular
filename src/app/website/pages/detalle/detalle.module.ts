import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetalleComponent } from "./detalle.component";
import { RouterModule, Routes } from "@angular/router";
import { SwiperModule } from "swiper/angular";
import { MaterialModule } from "../../../material/material.module";

// * ruta ->  product/:id/:title
const routes: Routes = [{ path: ":id/:title", component: DetalleComponent }];

@NgModule({
  declarations: [DetalleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SwiperModule, MaterialModule],
})
export class DetalleModule {}
