import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-spinner",
  template: `
    <div class="swapping-squares-spinner" :style="spinnerStyle">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
  `,
  styleUrls: ["./spinner.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
