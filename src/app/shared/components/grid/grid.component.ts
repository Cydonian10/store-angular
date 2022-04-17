import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-grid",
  template: `
    <ul class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      <ng-content></ng-content>
    </ul>
  `,
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
