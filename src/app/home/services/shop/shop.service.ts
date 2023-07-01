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

  getProduct(id: string) {
    const url = `${environment.productsAPIUrl}${id}`;
    return this.httpClient.get<Product>(url);
  }

  getProductsByTitle(title: string) {
    const url = environment.productsAPIUrl;
    const params = new HttpParams().append('title', title);

    return this.httpClient.get<Product[]>(url, { params });
  }

  getProducts(searchFilters: Partial<SearchFilters>) {
    const url = environment.productsAPIUrl;
    const { title, price_min, price_max, category } = searchFilters;
    let params = new HttpParams();

    if (title) {
      params = params.append('title', title);
    }

    if (price_min || price_min === 0) {
      params = params.append('price_min', price_min);
    }

    if (price_max || price_max === 0) {
      params = params.append('price_max', price_max);
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
