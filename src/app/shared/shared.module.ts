import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/material/material.module";

import { NavigationComponent } from "./components/navigation/navigation.component";
import { CardComponent } from "./components/card/card.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { GridComponent } from "./components/grid/grid.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { LayoutAdminComponent } from "./components/layout-admin/layout-admin.component";
import { ImageErrorDirective } from "./directivas/image-error.directive";

@NgModule({
  declarations: [
    NavigationComponent,
    CardComponent,
    SpinnerComponent,
    GridComponent,
    LoadingComponent,
    LayoutAdminComponent,
    ImageErrorDirective,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    NavigationComponent,
    CardComponent,
    SpinnerComponent,
    GridComponent,
    LoadingComponent,
    LayoutAdminComponent,
    ImageErrorDirective,
  ],
})
export class SharedModule {}
