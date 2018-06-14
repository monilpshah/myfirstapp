import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  y="";
  no1:number=0;
  no2:number=0;
  f:number;
  ans:number=0;
  onClick1(){
    this.y+="1";}

  onClick2(){
     this.y+="2";}

  onClick3(){
    this.y+="3";}

  onClick4(){
    this.y+="4";}

  onClick5(){
    this.y+="5";}

  onClick6(){
    this.y+="6";}

  onClick7(){
    this.y+="7";}

  onClick8(){
    this.y+="8";}

   onClick9(){
    this.y+="9";}

   onClick0(){
    this.y+="0";}

    onClickplus(){
      this.no1=parseInt(this.y);
      this.y="";
      this.f=1;
    }

    onClickminus(){
      this.no1=parseInt(this.y);
      this.y="";
      this.f=2;
    }

    onClickmul(){
      this.no1=parseInt(this.y);
      this.y="";
      this.f=3;
    }

    onClickdiv(){
      this.no1=parseInt(this.y);
      this.y="";
      this.f=4;
    }
    onClickeq(){
      if(this.f==1){
        this.no2=parseInt(this.y);
        this.ans=this.no1+this.no2;
        this.y=this.ans+"";
      }
      else if(this.f==2){
        this.no2=parseInt(this.y);
        this.ans=this.no1-this.no2;
        this.y=this.ans+"";
      }
      else if(this.f==3){
        this.no2=parseInt(this.y);
        this.ans=this.no1 *this.no2;
        this.y=this.ans+"";
      }
      if(this.f==4){
        if(parseInt(this.y)==0){
          alert("Second number can't be ZERO");
        }
        else{
          this.no2=parseInt(this.y);
        this.ans=this.no1/this.no2;
        this.y=this.ans+"";}
      }
    }
    onClickce(){
      this.y=""
    }
}
