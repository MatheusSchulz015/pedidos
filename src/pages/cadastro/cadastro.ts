import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from '../../domain/user/user';
import { Http } from '@angular/http';
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  
  private url = "http://qfome.dev/api/user/register";
  constructor(public navCtrl: NavController,public http:Http)
  {
  }

  public user = {
    name:null,
    email:null,
    password:null
  }
   submit()
  {
    console.log(this.user.name+"EMAIL");
    this.http.post(this.url,this.user)
    .subscribe(data=>{
        let resp = (data as any)._body;
        console.log(resp);

    });
  }
}
