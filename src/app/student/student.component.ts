import { Component, OnInit } from '@angular/core';
import { student } from './student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  Rollno:number;
  Name:string="";
  Mobileno:number;
  Gender:string="";
  City:string="";
  Fee:number;
  updateno;


  constructor(private _xyz:StudentService,private _route:Router) { }

  ngOnInit() {
    this._xyz.getAllStudents().subscribe(
      (data:student[])=>{
        this.parr=data;
        console.log(this.parr);
      }
    );

  }


 parr:student[]=[
   new student(1,"Monil",9173569994 ,"Male","Ahmedabad",1000),
   new student(2,"Bunny",9427806221 ,"Male","Ahmedabad",1000),
   new student(3,"Smit",9428510258 ,"Male","Ahmedabad",1000),
   new student(4,"Raj",9409218075,"Male","Ahmedabad",1000)
 ]


onAdd(){

    this._xyz.addStudent(new student(this.Rollno,this.Name,this.Mobileno,this.Gender,this.City,this.Fee)).subscribe(
      (data:any)=>{
        this.parr.push(new student(this.Rollno,this.Name,this.Mobileno,this.Gender,this.City,this.Fee));
      }
    );

    alert("data has been added");
}
onEdit(item){
  this._route.navigate(['/editstudent',item.Rollno]);
}
onDelete(i){
  this.parr.splice(i,1);
}

onUpdate(student){
  this.updateno=prompt("Enter a Number for Following.    1 for rollno.   2 for name   3 for mobile number.     4 for city.   5 for fee");
  if(this.updateno==1){
    student.Rollno=prompt("Enter new Roll number");
  }
  if(this.updateno==2){
    student.Name=prompt("Enter new Name");
  }
  if(this.updateno==3){
    student.Mobileno=prompt("Enter new Mobile number");
  }
  if(this.updateno==4){
    student.City=prompt("Enter new city");
  }
  if(this.updateno==5){
    student.Fee=prompt("Enter new Fees");
  }

}
}

