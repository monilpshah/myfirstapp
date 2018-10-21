import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { sihlclass } from './sihl';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SihlloginService {

  private url:string='http://nest2.sihlnettrade.com/NestHtml5Mobile/rest/GetInitialKey';
  constructor(private _http:HttpClient) { }


  loginservice(){

   let head1=new HttpHeaders().set('Content-Type','application/json');
   let head2=new HttpHeaders().set('access-control-allow-origin','http://localhost:4200');
  //  let head16=new HttpHeaders().set('access-control-allow-headers','X-Requested-With');
  //  let head3=new HttpHeaders().set('access-control-allow-headers','Content-Type');
  //  let head4=new HttpHeaders().set('access-control-allow-headers','X-Codingpedia');
  //  let head5=new HttpHeaders().set('access-control-allow-methods','POST');
  //  let head6=new HttpHeaders().set('access-control-allow-origin','*');
  //  let head7=new HttpHeaders().set('cache-control','private');
  //  let head8=new HttpHeaders().set('connection','Keep-Alive');
  //  let head9=new HttpHeaders().set('content-length','656');
  //  let head10=new HttpHeaders().set('content-type','application/json');
  //  let head11=new HttpHeaders().set('content-type','Sun, 21 Oct 2018 04:09:50 GMT');
  //  let head12=new HttpHeaders().set('keep-alive','timeout=5, max=100');
  //  let head13=new HttpHeaders().set('pragma','no-cache');
  //  let head14=new HttpHeaders().set('server','Apache-Coyote/1.1');
  //  let head15=new HttpHeaders().set('via ','1.1 nest2.sihlnettrade.com');

  let body = JSON.stringify({ 'foo': 'bar' });
  let headers = new Headers({ 'Content-Type': 'application/json' });



    return this._http.post(this.url,{HttpHeaders:head1,head2,headers}).pipe(map((response: any) => response.json()));


    // ,head3,head4,head5,head6,head7,head8,head9,head10,head11,head12,head13,head14,head15,head16

  }
}
