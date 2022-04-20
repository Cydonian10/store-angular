import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-login",
  template: `
    <p>
      login works!
    </p>
  `,
  styleUrls: ["./login.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
