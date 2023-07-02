import { IntersectingDirective } from './intersecting.directive';

describe('IntersectingDirective', () => {
  it('should create an instance', () => {
    const directive = new IntersectingDirective({
      nativeElement: {} as HTMLInputElement,
    });
    expect(directive).toBeTruthy();
  });
});
