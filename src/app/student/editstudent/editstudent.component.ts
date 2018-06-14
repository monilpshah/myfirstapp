import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../student.service';
import { student } from '../student';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  x:number;
  Rollno:number;
  Name:string;
  Mobileno:number;
  Gender:string;
  City:string;
  Fee:number;

  constructor(private _route:Router,private _acroute:ActivatedRoute,private _data:StudentService) { }

  ngOnInit() {
    this.x=this._acroute.snapshot.params['Rollno'];
    this._data.getStudentById(this.x).subscribe(
      (data:student[])=>{
        this.Rollno=data[0].Rollno;
        this.Name=data[0].Name;
        this.Mobileno=data[0].Mobileno;
        this.Gender=data[0].Gender;
        this.City=data[0].City;
        this.Fee=data[0].Fee;
      }
    );
  }
onSave(){
  this._data.updateStudent(new student(this.Rollno,this.Name,this.Mobileno,this.Gender,this.City,this.Fee)).subscribe(
    (data:any)=>{
      console.log(data);
      this._route.navigate(['/student']);
    }
  );
}
}
