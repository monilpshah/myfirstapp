import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ans:number;
  onClick1(m,n){
    this.ans=parseInt(m)+parseInt(n);}
    onClick2(m,n){
      this.ans=parseInt(m)-parseInt(n);}
    
    onClick3(m,n){
      this.ans=parseInt(m)*parseInt(n);
    }
    
    onClick4(m,n){
      this.ans=parseInt(m)/parseInt(n);}
}
