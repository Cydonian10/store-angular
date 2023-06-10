import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-card",
  template: `
    <div class="card">
      <figure class="h-[200px] overflow-hidden">
        <ng-content select="[image]"></ng-content>
      </figure>

      <div class="pt-2 px-3 text-white">
        <ng-content select="[body]"></ng-content>
      </div>

      <div class="p-2 text-white flex justify-end items-center gap-3">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ["./card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
