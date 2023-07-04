import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackSrc]',
})
export class FallbackSrcDirective {
  @Input() appFallbackSrc = '';
  hasBeenTriggered = false;

  @HostListener('error') onError() {
    if (!this.hasBeenTriggered) {
      this.replaceSrc();
      this.hasBeenTriggered = true;
    }
  }

  constructor(private elementRef: ElementRef) {}

  private replaceSrc() {
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;

    if (this.appFallbackSrc) {
      imageElement.src = this.appFallbackSrc;
    }
  }
}
