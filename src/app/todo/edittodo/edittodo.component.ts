import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../../todo.service';
import { Tasks  } from '../Task';

@Component({
  selector: 'app-edittodo',
  templateUrl: './edittodo.component.html',
  styleUrls: ['./edittodo.component.css']
})
export class EdittodoComponent implements OnInit {

  x:number;
  Id:number;
  Title:string;
  Status:string;

  constructor(private _route:Router,private _acroute:ActivatedRoute,private _data:TodoService) { }

  ngOnInit() {
      this.x=this._acroute.snapshot.params['id'];
    this._data.getTaskById(this.x).subscribe(
      (data:Tasks)=>{
        this.Id=data[0].Id;
        this.Title=data[0].Title;
        this.Status=data[0].Status;
      }
    );
  }
onSave(){
  this._data.updateTask(new Tasks(this.Id,this.Title,this.Status)).subscribe(
    (data:any)=>{
      console.log(data);
      this._route.navigate(['/todo']);
    }
  );
}
}
