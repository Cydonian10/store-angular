import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appImageError]",
})
export class ImageErrorDirective {
  @HostListener("error")
  handleError(): void {
    this.elment.nativeElement.src =
      "https://www.sam-manipulados.com/wp-content/uploads/2014/01/default_image_01.png";
  }

  constructor(private elment: ElementRef<HTMLImageElement>) {}
}
