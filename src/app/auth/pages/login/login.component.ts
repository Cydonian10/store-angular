import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Location } from "@angular/common";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@core/services/auth/auth.service";
import { Router } from "@angular/router";
import { Status } from "@core/interfaces/types.interface";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { InicioRapidoComponent } from "./inicio-rapido/inicio-rapido.component";

@Component({
  selector: "app-login",
  template: `
    <div class="login order-2">
      <div class="login-container">
        <h3 class="text-center">Login</h3>
        <form (ngSubmit)="handleSubmit()" [formGroup]="loginForm">
          <!-- ******************************* -->
          <!-- * Email * -->
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Email</mat-label>
            <input formControlName="email" type="email" matInput />
          </mat-form-field>
          <!-- ******************************* -->
          <!-- * Password * -->
          <mat-form-field class="w-full" appearance="outline">
            <mat-label>Password</mat-label>
            <input formControlName="password" type="password" matInput />
          </mat-form-field>

          <button *ngIf="status !== 'loading'; else loading" type="submit" mat-raised-button>
            <mat-icon>login</mat-icon>
            Ingresar
          </button>
          <ng-template #loading>
            <button [disabled]="status === 'loading'" class="flex items-center justify-center">
              <app-loading></app-loading>
            </button>
          </ng-template>
        </form>

        <button (click)="openInicioRapido()" class="my-4">Inicio Rapido</button>
      </div>
    </div>

    <div class="register">
      <img routerLink="/" src="assets/login.png" width="600" />
    </div>
  `,
  styleUrls: ["./login.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  status: Status = "init";

  loginForm = this.fb.group({
    email: ["admin@mail.com", [Validators.required]],
    password: ["admin123", [Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.status = "loading";
    this.authService
      .login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value)
      .subscribe({
        next: () => this.nextFuncion(),
        error: () => {},
        complete: () => (this.status = "init"),
      });
  }

  nextFuncion() {
    this.status === "success";
    this.router.navigateByUrl("/home");
  }

  openInicioRapido(): void {
    const dialogRef = this.dialog.open(InicioRapidoComponent, {
      width: "400px",
    });
  }
}
