import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { AuthService } from "@core/services/auth/auth.service";
import { Observable } from "rxjs";
import { IUser } from "@core/interfaces/user.interface";

@Component({
  selector: "app-profile",
  template: `
    <ng-container *ngIf="userLoageado | async as user">
      <pre>{{ user | json }}</pre>
      <button [routerLink]="['/admin/product']" mat-stroked-button *ngIf="user.role === 'admin'">
        Cms
      </button>
    </ng-container>
  `,
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  userLoageado!: Observable<IUser | null>;

  constructor(private authService: AuthService) {
    this.userLoageado = this.authService.userLogueado$;
  }
}
