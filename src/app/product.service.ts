import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseUrl="http://localhost:8081/api/product";

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    console.log("product: "+product)
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchProducts(keyword: string, page: number, size: number): Observable<any> {
    const params = new HttpParams().set('keyword', keyword).set('page', page.toString()).set('size', size.toString());
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
}
