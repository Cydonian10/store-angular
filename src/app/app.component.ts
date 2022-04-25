import { Component, OnInit } from "@angular/core";
import { TokeService } from "./core/services/local-storage/toke.service";
import { AuthService } from "./core/services/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private tokeService: TokeService, private authService: AuthService) {}
  ngOnInit(): void {
    const token = this.tokeService.getToken();
    token && this.authService.profile().subscribe();
  }
}
