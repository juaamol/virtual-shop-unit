import { FallbackSrcDirective } from './fallback-src.directive';

describe('FallbackSrcDirective', () => {
  it('should create an instance', () => {
    const directive = new FallbackSrcDirective({
      nativeElement: {} as HTMLInputElement,
    });
    expect(directive).toBeTruthy();
  });
});
