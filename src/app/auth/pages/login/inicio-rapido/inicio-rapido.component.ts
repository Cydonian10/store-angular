import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { AuthService } from "@core/services/auth/auth.service";
import { Router } from "@angular/router";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";

@Component({
  selector: "app-inicio-rapido",
  template: `
    <h1 class="text-center text-primary" mat-dialog-title>Inicio sesión como</h1>
    <div mat-dialog-content>
      <div class="flex justify-around">
        <button mat-raised-button (click)="handleAdmin()" color="primary">Administrador</button>
        <button mat-raised-button (click)="handleCustomer()" color="warn">Comprador</button>
      </div>
    </div>
  `,
  styleUrls: ["./inicio-rapido.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioRapidoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<InicioRapidoComponent>
  ) {}

  ngOnInit(): void {}

  handleAdmin() {
    this.authService.login("admin@mail.com", "admin123").subscribe({
      next: () => {
        this.router.navigateByUrl("/");
        this.dialogRef.close();
      },
    });
  }

  handleCustomer() {
    this.authService.login("maria@mail.com", "12345").subscribe({
      next: () => {
        this.router.navigateByUrl("/");
        this.dialogRef.close();
      },
    });
  }
}
