import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "../../../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { InicioRapidoComponent } from './inicio-rapido/inicio-rapido.component';

const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, InicioRapidoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class LoginModule {}
