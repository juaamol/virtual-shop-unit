import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/data/types/product';
import { environment } from 'src/environment';
import { SearchFilters } from '../../../data/types/search-filters';
import { Category } from 'src/app/data/types/category';
import { Pagination } from 'src/app/data/types/pagination';

const DEFAULT_PAGINATION: Pagination = { offset: 0, limit: 10 };

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private httpClient: HttpClient) {}

  getProduct(id: string) {
    const url = `${environment.productsAPIUrl}${id}`;
    return this.httpClient.get<Product>(url);
  }

  getProductsByTitle(title: string, pagination = DEFAULT_PAGINATION) {
    return this.getProducts({ title }, pagination);
  }

  getProductsByCategory(category: string, pagination = DEFAULT_PAGINATION) {
    return this.getProducts({ category }, pagination);
  }

  getProducts(searchFilters: Partial<SearchFilters>, pagination?: Pagination) {
    const url = environment.productsAPIUrl;
    const { title, price_min, price_max, category } = searchFilters;
    let params = new HttpParams();

    if (pagination) {
      params = params.append('offset', pagination.offset);
      params = params.append('limit', pagination.limit);
    }

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
