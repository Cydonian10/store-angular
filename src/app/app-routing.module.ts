import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "@shared/components/navigation/navigation.component";
import { LayoutAdminComponent } from "./shared/components/layout-admin/layout-admin.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadChildren: () => import("./auth/pages/login/login.module").then((m) => m.LoginModule),
      },
    ],
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
      {
        path: "cart", // ! ruta ->  cart/
        loadChildren: () => import("@website/pages/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "categories", // ! ruta ->  categories/:id/:categoriaName
        loadChildren: () =>
          import("@website/pages/category/category.module").then((m) => m.CategoryModule),
      },
      {
        path: "profile",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("@website/pages/profile/profile.module").then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: "admin",
    component: LayoutAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: "product",
        loadChildren: () =>
          import("./admin/pages/product/product.module").then((m) => m.ProductModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
