import { Component, OnInit } from '@angular/core';
import { product} from './product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _xyz:ProductService,private _route:Router) { }

  ngOnInit() {
    this._xyz.getAllProducts().subscribe(
      (data:product[])=>{
        this.parr=data;
        console.log(this.parr);
      }
    );
  }
  Id:number;
  Name:string="";
  Price:number;
  Image:string="../../assets/images/Chrysanthemum.jpg";
  Mfg:string="";
  Soh:number;
  flag:boolean=false;
  upadateno;

  parr:product[]=[

  ]

  onAdd(){
    this._xyz.addProuct(new product(this.Id,this.Name,this.Price,this.Image,this.Mfg,this.Soh)).subscribe(
      (data:any)=>{
        this.parr.push(new product(this.Id,this.Name,this.Price,this.Image,this.Mfg,this.Soh));
      }
    );

  }

  onEdit(item){
    this._route.navigate(['/editproduct',item.Id]);
  }

  onvisible(){
    if(this.flag){
      this.flag=false;
    }
    else if(this.flag==false){
      this.flag=true;
    }
  }
  onDelete(item:product){
    this._xyz.deleteProduct(item).subscribe(
      (data:any)=>{
          this.parr.splice(this.parr.indexOf(item),1);
      }
    );

  }
  onUpdate(parr){
    this.upadateno=prompt("Enter what you want to change?                    1 for price.    2 for MFG.       3 for SOH");
    this.upadateno=parseInt(this.upadateno);
    if (this.upadateno==1)
    parr.Price=prompt("Enter new price");
    else if(this.upadateno==2)
    parr.Mfg=prompt("Enter new MFG");
    else if(this.upadateno==3)
    parr.Soh=prompt("Enter new SOH");
  }
}
