import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/data/types/product';
import { environment } from 'src/environment';
import { SearchFilters } from '../../../data/types/search-filters';
import { Category } from 'src/app/data/types/category';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpClient: HttpClient) {}

  getProductsByTitle(title: string) {
    const url = environment.productsAPIUrl;
    const params = new HttpParams().append('title', title);

    return this.httpClient.get<Product[]>(url, { params });
  }

  getProducts(searchFilters: Partial<SearchFilters>) {
    const url = environment.productsAPIUrl;
    const { title, minPrice, maxPrice, category } = searchFilters;
    let params = new HttpParams();

    if (title) {
      params = params.append('title', title);
    }

    if (minPrice || minPrice === 0) {
      params = params.append('price_min', minPrice);
    }

    if (maxPrice || maxPrice === 0) {
      params = params.append('price_max', maxPrice);
    }

    if (category) {
      params = params.append('categoryId', category);
    }

    return this.httpClient.get<Product[]>(url, { params });
  }

  getCategories() {
    return this.httpClient.get<Category[]>(environment.categoriesAPIUrl);
  }
}
