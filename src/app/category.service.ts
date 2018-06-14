import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { category } from './category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private url:string='http://localhost:3000/Category/';

  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }
  getCategoryById(id){
    return this._http.get(this.url+id);
  }
  addCategory(item:category){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});

  }
  deleteCategory(item:category){
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+item.Id,{headers:head1});
  }


    updateCategory(item:category){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+item.Id,body,{headers:head1});
  }

}
