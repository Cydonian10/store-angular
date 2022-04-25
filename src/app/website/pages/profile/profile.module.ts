import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "../../../material/material.module";

const routes: Routes = [{ path: "", component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class ProfileModule {}
