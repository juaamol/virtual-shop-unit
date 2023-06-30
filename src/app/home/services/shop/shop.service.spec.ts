import { TestBed } from '@angular/core/testing';

import { ShopService } from './shop.service';
import { HttpClient, HttpParams } from '@angular/common/http';

describe('ShopService', () => {
  let service: ShopService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: { get: () => {} } }],
    });
    service = TestBed.inject(ShopService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the url with {title: abc}', () => {
    const expectedParams = new HttpParams().set('title', 'abc');
    const httpClientSpy = spyOn(httpClient, 'get');

    service.getProductsByTitle('abc');

    const recentCall = httpClientSpy.calls.mostRecent();
    const paramsUsed = recentCall.args[1]?.params as HttpParams;
    expect(expectedParams.get('title')).toEqual(paramsUsed.get('title'));
  });
});
