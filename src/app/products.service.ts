import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IProduct} from './product'
import { Observable } from 'rxjs';

interface status{
  success:Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  allProducts:IProduct[]

  orders=[]
  checkRemainedProducts=true

  constructor(private http:HttpClient) {
    
   }

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('/api/posts/products')
  }

  newProduct(product:IProduct):Observable<status>{
    return this.http.post<status>('/api/posts/products',product)
  }

  updateProduct(product:IProduct){
    return this.http.post<status>('/api/posts/products/update',product)
  }
}
