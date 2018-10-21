import { Component, OnInit, ViewChild } from "@angular/core";
import { Tasks } from "./Task";
import { TodoService } from "../todo.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { DeletealltaskService } from "../deletealltask.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  Id: number;
  Title: string;
  Status: string;

  arr: Tasks[] = [];
  delarr: Tasks[] = [];
  i: number = 0;
  constructor(
    private _xyz: TodoService,
    private _route: Router,
    private _delete: DeletealltaskService
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this._xyz.getAllTasks().subscribe((data: Tasks[]) => {
      this.arr = data;
      this.dataSource.data = this.arr;
    });
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  oncheckchange(item: Tasks) {
    if (this.delarr.find(x => x == item)) {
      this.delarr.splice(this.delarr.indexOf(item), 1);
    } else {
      this.delarr.push(item);
    }
    console.log(this.delarr);
  }

  deleteAll() {
    this._delete.deleteAll(this.delarr).subscribe(
      (data: any) => {
        for (this.i = 0; this.i < this.delarr.length; this.i++) {
          if (this.arr.find(x => x == this.delarr[this.i])) {
            this.arr.splice(this.arr.indexOf(this.delarr[this.i]), 1);
          }
        }
        this.dataSource.data=this.arr;
      }
    );
  }
  //table add angular material
  // ELEMENT_DATA: Tasks[] = [];

  // ELEMENT_DATA: Tasks[] = this.arr;
  displayedColumns: string[] = ["Action", "Id", "Title", "Status"];
  dataSource = new MatTableDataSource(this.arr);

  onAdd(x, y, z) {
    this._xyz.addTask(new Tasks(x, y, z)).subscribe(
      (data: any) => {
      this.arr.push(new Tasks(x, y, z));
    });
  }

  onEdit(item: Tasks) {
    this._route.navigate(["/edittodo", item.Id]);
  }

  onUpdate(item: Tasks) {
    if (item.Status == "done") {
      item.Status = "pending";
    } else {
      item.Status = "done";
    }
  }
  onDelete(item: Tasks) {
    this._xyz.deleteTask(item).subscribe((data: any) => {
      this.arr.splice(this.arr.indexOf(item), 1);
    });
  }
}
