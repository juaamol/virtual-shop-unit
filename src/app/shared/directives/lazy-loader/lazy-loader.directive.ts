import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoader]',
})
export class LazyLoaderDirective implements OnInit {
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.unobserve(entry.target);
        }
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private loadImage() {
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;
    const imageUrl = imageElement.getAttribute('data-src');

    if (imageUrl) {
      imageElement.src = imageUrl;
    }
  }
}
