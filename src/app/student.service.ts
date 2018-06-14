import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { student } from '../app/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    private url:string='http://localhost:3000/Students';
  constructor(private _http:HttpClient) { }

  getStudentById(Rollno){
    return this._http.get(this.url+Rollno);
  }
  getAllStudents(){
    return this._http.get(this.url);
  }

  addStudent(item:student){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }

  deleteStudent(item:student){
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+item.Rollno,{headers:head1});
  }

  updateStudent(item:student){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+item.Rollno,body,{headers:head1});
  }
}
