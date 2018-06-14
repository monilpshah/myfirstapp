import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category.service';
import { category } from '../category';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  x:number;
  Id:number;
  Name:string;
  IsActive:string;
  constructor(private _route:Router,private _acroute:ActivatedRoute,private _data:CategoryService) { }

  ngOnInit() {
    this.x=this._acroute.snapshot.params['id'];
    this._data.getCategoryById(this.x).subscribe(
      (data:category)=>{
        this.Id=data[0].Id;
        this.Name=data[0].Name;
        this.IsActive=data[0].IsActive;
      }
    );
  }
  onSave(){
    this._data.updateCategory(new category(this.Id,this.Name,this.IsActive)).subscribe(
      (data:any)=>{
        console.log(data);
        this._route.navigate(['/category']);
      }
    );
  }
}
