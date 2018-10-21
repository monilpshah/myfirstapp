import { Component, OnInit } from '@angular/core';
import { product} from './product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { SihlloginService } from '../sihl/sihllogin.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _xyz:ProductService,private _route:Router,private _s:SihlloginService) { }

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
  Image:string="";
  Mfg:string="";
  Soh:number;
  flag:boolean=false;
  upadateno;
  selectedFile:File=null;
  parr:product[]=[

  ]

  onAdd(){
    const fd=new FormData();
    fd.append('Id',this.Id.toString());
    fd.append('Name',this.Name);
    fd.append('Price',this.Price.toString());
    fd.append('image',this.selectedFile,this.selectedFile.name);
    fd.append('Mfg',this.Mfg);
    fd.append('Soh',this.Soh.toString());
    this._xyz.addProuct(fd).subscribe(
      (data:any)=>{
        this.parr.push(new product(this.Id,this.Name,this.Price,this.Image,this.Mfg,this.Soh));
        console.log(data);
      }
    );

  }

  onChange(value)
  {
    this.selectedFile=<File>value.target.files[0];
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
