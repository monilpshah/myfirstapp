import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
 import { product } from './product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string='http://localhost:3000/Products/';

  constructor(private _http:HttpClient) { }
  getproductById(id){
    return this._http.get(this.url+id);
  }
  getAllProducts(){
      return this._http.get(this.url);
  }

  addProuct(item){

    return this._http.post(this.url,item);
  }

  deleteProduct(item:product){
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+item.Id,{headers:head1});
  }

  updateProduct(item:product){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+item.Id,body,{headers:head1});
  }
}
