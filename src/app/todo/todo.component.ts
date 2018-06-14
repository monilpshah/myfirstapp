  import { Component, OnInit } from '@angular/core';
import { Tasks } from './Task';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    arr:Tasks[]=[
      new Tasks(1,"Email to your manager","pending"),
      new Tasks(2,"Go for movie","done"),
      new Tasks(3,"Push your code to github","pending")
    ]
  constructor(private _xyz:TodoService,private _route:Router) { }

  ngOnInit() {
    this._xyz.getAllTasks().subscribe(
      (data:Tasks[])=>{
        this.arr=data;
      }
    );
  }

    onAdd(x,y,z){
      this._xyz.addTask(new Tasks(x,y,z)).subscribe(
        (data:any)=>{
          this.arr.push(new Tasks(x,y,z));
        }
      );

    }


    onEdit(item:Tasks){
      this._route.navigate(['/edittodo',item.Id]);
    }


  onUpdate(item:Tasks){
    if(item.Status=="done")
    {
      item.Status="pending";
    }
    else{
      item.Status="done";
    }

  }
  onDelete(item:Tasks){
    this._xyz.deleteTask(item).subscribe(
      (data:any)=>{
        this.arr.splice(this.arr.indexOf(item),1);
      }
    );


  }


}
