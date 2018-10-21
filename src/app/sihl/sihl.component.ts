import { Component, OnInit } from '@angular/core';
import { SihlloginService } from '../sihl/sihllogin.service';
import { sihlclass } from './sihl';
declare function  encryptBlock(src, publicKey, keySize):any;
declare function  decrypt(privateKey, src):any;
declare function getIntialKey():any;
import * as JsEncryptModule from 'jsencrypt';


@Component({
  selector: 'app-sihl',
  templateUrl: './sihl.component.html',
  styleUrls: ['./sihl.component.css'],
})
export class SihlComponent implements OnInit {


  constructor(private _s: SihlloginService) {}
demo:string;
demo1:string;
privatekey:string="MIIEpAIBAAKCAQEAtnKSIw8XB9OB01XM0KGu9S3IGNDBCnWXMGsT8ODIeY7vJiEhwB4K4H+9zofYaT8a8u0mfMi7k3q70/+v4/SDYbUYVWCTVirg9Tl+u0qrTKgqoonWsSf2bYfK2EjEq0qsqUOeTGKo9N6Nlx40gKESshLLChbB+FjV9mBvj9yzyzewNgNG267sdwvj5eGj5nRlPwgfzockXu96sGkcLuKdE0WezPt5LT+bpSgdxG3B/Wud2uoZ3LsO5A+SWL3tnxS26H8tlU9CkRplzetE+4eB4S4EUqknrp9FawHoB+7SavD+8/0oYTZb9RgOEWowEbLJF/r8E3sCtgDF9ZK9IlX13QIDAQABAoIBAHhIiq4QeceQGwyAiZqWrek4uK4bmtlRc07ZmXj6SVFS+bnyp/SoGdWugi2ShAvHLfYwgWpNUNVHWmPHM2gfQSr+oL9Q/3IUrOEfebzy2oKccBdetqtvRFkr6IC1YOvpPHIPgWKsvOVLgJ+7qzOOfevm1fOd013u+4kGRSbcg7CatljJc56PB0yKcCMgJ34Gn/QYwB6l/Bbv3eC/b7weTedB7OpZAptkZwOYpyBF8KIzX4bKySHOSfC88ifBBdaxIBJV5UPzyz+etBidQn8j2/UWvr7MPrDk5SM4zSJAoCFNB7ELGUa2GdV1b89Bj3WkgYlO9k7s3TKqT6x/v1TzUKECgYEA2fOhe1vRX0U0sc39LibcDcBGxw1IvWuWxzLHZN9Vuu0vIm/6b/9L07GEW/M4gAlRMzwjcv5gtaMHOfRrEjVZ4To4LaT4JTPTElrA5yeqqQZGGiUC9sIOCYNmskgBuqeUVzfXhuQpU4LLfP2+njS/SGlrmWD2TOGsYNNhZfqeLqUCgYEA1kw+CpCTb95gjlqC0ZunTvDuXQGx5ij5Pr9chX2HH8ty321W8TRnjW/PqCUQTd4oNh/BNQ1plU8wIc6UuK67cMCOWb6Tfq3ygwN71AW5n2IcBpvoLK/ZyPcx+v9XrL2sSvANClHtQRFsnoKzrUPNiM/hED8FowU7N8XtOmEe/NkCgYEAhCaF3h8xFxwGNF0ayzYCrU/NWnoChd/LX2K5pb8I4ztXHgFZjzjziBsVjw8tTezYUEGBmQMGLnv4MLqzhSnWIotDbuGdGCmRLIrcdgwGHVBRhx6z6lyFWF1VEno4mi1r82pHg2GqcRlYOqQ8RP7kkIpjFG/HR5x6AYeJgeTwroUCgYBhGH5rzwHeiAV7umrXig0OaX+2yFPQkvQLiCzllvCoaUgND7963mGk5epSpyhx/5x8mXqzDPav3gdS6gTcgN8QwU4+P2kY1ruwvN1YPZfTLWLBY9aYmLy2n7oXnaYd8HqmIYnnCSPUfY6Xa2T5tmTj/jxdXhCxwmcIaDeKYgLmUQKBgQCDojGH+/bSOm4WG9BT9Nk1JpIxJ02dpwjvvTZquK7/GCMpCM9wtfFXn+75kJZwd77S9d/KsxZMM1gbCH8KVyqD/ZE5MnHdCNsNyKdSyXrZ3iDW3QrFz3xoHkMZ3BLArdzMo38XGRa16djXWF7I7C4n/6lQHOdxAzZZm7i4GRiReg==";
pb3:string;
pb1:string="LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFuTFlVc3pabWhEdnkzY0tsMWVtSwpGcGxZQUNOL2RWdUlhYnRCQ21uOTNQVURicDArbnpiU0xLdGQ1LzBnVFJjeDhHNXVVMEVGdmc2TlV5YXVwVG9oClhDNm5Na1piRkV1VUZQSFRpakh6QzJma0NoK3dJOVdlNjV6eFo3dEcyWHUxaTYyK0dLdlZrYWFWOFdDMXI0Q2QKUlloeENYYy9hQ3FRM285MGVZWXhvR2FwNC9HVTYxbmtVcXNQWnkyVDRaS1hnWGtxZEtUei9mbVo5WFhVckVtWAo4ck9SbDlqYjcxU3BibUUrZzRiT2NIUnp5YTRlcFFsRm1IdUp6RHdXOWVkaDFEMHc4ZnZ3aS9kL2ZMVHd4UnpiCjB0Z3I3NUJBdTJHd0NWa2F5VkhhcHNxdWdjM0ZnV1p6VHRxVEhka05oREtvK3NYdE9yZDZYRndrN3dPaTlHa3QKUXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==";
decryptedkey:string;

encrypt = new JsEncryptModule.JSEncrypt({default_key_size:2048});
ngOnInit() {

    // this.demo=this.encrypt.getPublicKey();
    // console.log("getPublicKey:  \n"+this.demo);

    // this.demo1=this.encrypt.getPrivateKey();
    // console.log("private"+this.demo1);

    // this.pb3=encryptBlock(this.demo,this.pb1,2048);
    //  console.log("encrypt key  is: \n"+this.pb3);

    // this.decryptedkey=decrypt(this.privatekey,this.pb3);
    // console.log(this.decryptedkey);


  }


  login(){
      this._s.loginservice().subscribe(
        (data:any[])=>{
          console.log("success");
        }
      );
    }

}
