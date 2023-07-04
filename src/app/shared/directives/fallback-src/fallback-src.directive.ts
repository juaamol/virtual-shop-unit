import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackSrc]',
})
export class FallbackSrcDirective {
  @Input() appFallbackSrc = '';

  @HostListener('error') onError() {
    this.replaceSrc();
  }

  constructor(private elementRef: ElementRef) {}

  private replaceSrc() {
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;

    if (this.appFallbackSrc) {
      imageElement.src = this.appFallbackSrc;
    }
  }
}
