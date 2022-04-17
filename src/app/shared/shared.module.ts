import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/material/material.module";

import { NavigationComponent } from "./components/navigation/navigation.component";
import { CardComponent } from "./components/card/card.component";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GridComponent } from './components/grid/grid.component';

@NgModule({
  declarations: [NavigationComponent, CardComponent, SpinnerComponent, GridComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [NavigationComponent, CardComponent, SpinnerComponent, GridComponent],
})
export class SharedModule {}
