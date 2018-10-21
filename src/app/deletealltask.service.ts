import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Tasks  } from './todo/Task';

@Injectable({
  providedIn: 'root'
})
export class DeletealltaskService {

  private url:string='http://localhost:3000/deletealltask/';
  constructor(private _http:HttpClient) { }

deleteAll(item){
  let body=JSON.stringify(item);
  let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url,body,{headers:head1});
}

}
