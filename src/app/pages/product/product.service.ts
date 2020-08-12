import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './product.model';
import { BaseService } from '~template/src/app/common/base.service';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {

  collection: string;
  constructor(private http: HttpClient) {
    super();
    this.collection = 'products';
    this.host = `${this.host}/${this.collection}.json?token=${this.token}`;
  }

  fetchProduct(): Observable<any> {
    return this.http.get(this.host);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.host, product);
  }

  setProduct(product: Product): Observable<any> {
    const newProduct = {
      ...product,
    };
    const id = newProduct.id;
    delete newProduct.id;

    return this.http.patch(this.host, {
      [id]: newProduct,
    });
  }

  setProducts(products: Product[]): Observable<any> {
    const updateProducts = products.reduce((c, product) => {
      const id = product.id;
      if (product.id) {
        delete product.id;
      }
      c[id] = product;
      return c;
    }, {});

    return this.http.put(this.host, updateProducts);
  }

  clearProduct(): Observable<any> {
    return this.http.delete(this.host);
  }

}
