import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loading",
  template: `
    <div class="intersecting-circles-spinner">
      <div class="spinnerBlock">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
      </div>
    </div>
  `,
  styleUrls: ["./loading.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
