import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIntersecting]',
})
export class IntersectingDirective {
  private observer!: IntersectionObserver;
  @Output() intersecting = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.intersecting.emit();
          this.observer.unobserve(entry.target);
        }
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }
}
