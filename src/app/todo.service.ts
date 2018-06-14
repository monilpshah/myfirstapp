import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Tasks  } from './todo/Task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url:string='http://localhost:3000/Tasks/';
  constructor(private _http:HttpClient) { }
  getTaskById(id){
    return this._http.get(this.url+id);
  }

getAllTasks(){
  return this._http.get(this.url);
}

addTask(item:Tasks){
  let body=JSON.stringify(item);
  let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url,body,{headers:head1});
}

deleteTask(item:Tasks){
  let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.delete(this.url+item.Id,{headers:head1});
}

updateTask(item:Tasks){
  let body=JSON.stringify(item);
  let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.put(this.url+item.Id,body,{headers:head1});
}

}
