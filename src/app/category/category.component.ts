import { Component, OnInit } from '@angular/core';
import { category } from "./category";
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Id:number;
  Name:string="";
   flag:boolean=false;
  upadateno;
  IsActive:string="";

  parr:category[]=[];
  constructor(private _xyz:CategoryService,private _route:Router) { }

  ngOnInit() {
    this._xyz. getAllCategory().subscribe(
      (data:any[])=>{
        this.parr=data;
        console.log(this.parr);
      }
    );
  }



  onAdd(){
    this._xyz.addCategory(new category(this.Id,this.Name,this.IsActive)).subscribe(
      (data:any)=>{
        this.parr.push(new category(this.Id,this.Name,this.IsActive));
      }
    );

  }


  onvisible(){
    if(this.flag){
      this.flag=false;
    }
    else if(this.flag==false){
      this.flag=true;
    }
  }

    onUpdate(item){
    //   this.upadateno=prompt("Enter what you want to change?                    1 for Name.");
    // this.upadateno=parseInt(this.upadateno);
    // if (this.upadateno==1)
    // parr.Name=prompt("Enter new Name");

    }
    onEdit(item){
        this._route.navigate(['/editcategory',item.Id]);
    }

  onDelete(item:category){
    this._xyz.deleteCategory(item).subscribe(
      (data:any)=>{
          this.parr.splice(this.parr.indexOf(item),1);
      }
    );



  }



}
