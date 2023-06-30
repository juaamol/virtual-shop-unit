import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/data/types/product';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpClient: HttpClient) {}

  getProductsByTitle(title: string) {
    const url = environment.shopAPIUrl;
    const params = new HttpParams().append('title', title);
    return this.httpClient.get<Product[]>(url, { params });
  }
}
