import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { product } from '../product';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  x:number;
  Id:number;
  Name:string;
  Image:string;
  Price:number;
  Mfg:string;
  Soh:number;
  constructor(private _route:Router,private _acroute:ActivatedRoute,private _data:ProductService) { }

  ngOnInit() {
    this.x=this._acroute.snapshot.params['id'];
    this._data.getproductById(this.x).subscribe(
      (data:product[])=>{
        this.Id=data[0].Id;
        this.Name=data[0].Name;
        this.Price=data[0].Price;
        this.Image=data[0].Image
        this.Mfg=data[0].Mfg;
        this.Soh=data[0].Soh;
      }
    );
  }
  onSave(){
    this._data.updateProduct(new product(this.Id,this.Name,this.Price,this.Image,this.Mfg,this.Soh)).subscribe(
      (data:any)=>{
        console.log(data);
        this._route.navigate(['/product']);
      }
    );
  }
}
