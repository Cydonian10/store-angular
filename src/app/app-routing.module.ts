import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "@shared/components/navigation/navigation.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "",
    component: NavigationComponent,
    children: [
      {
        path: "home",
        loadChildren: () => import("@website/pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "product", // ! ruta ->  product/:id/:title
        loadChildren: () =>
          import("@website/pages/detalle/detalle.module").then((m) => m.DetalleModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
