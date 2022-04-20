import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  template: `
    <button [disabled]="this.offset === 0" (click)="getPaginacion(-1)" mat-icon-button>
      <mat-icon>arrow_back_ios</mat-icon>
    </button>
    <button (click)="getPaginacion(1)" mat-icon-button>
      <mat-icon>arrow_forward_ios</mat-icon>
    </button>
  `,
  styleUrls: ["./pagination.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
  @Input() offset: number = 0;
  @Input() limit: number = 10;

  @Output() onPagination = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  getPaginacion(value: number) {
    this.onPagination.emit(value);
  }
}
