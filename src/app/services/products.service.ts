import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getSingleProduct(id: number) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product: any) {
    return this.http.post<IResponse>(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put<IResponse>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<IResponse>(`${this.baseUrl}/products/${id}`);
  }

}

interface IResponse {
  message: string;
  success: boolean;
}