import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {User} from '../../domain/user/user';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  
  
  private url = "http://qfome.dev/api/user/register";
  constructor(public navCtrl: NavController,
    public http:Http,
    private _alertCtrl:AlertController)
   
  {
  }

  public user = new User();
  
   submit()
  {
    return this.http.post(this.url,this.user)
    .map(resp => resp.json())
    .toPromise()
    .then(data=>{
      this.authe();
    })
    .catch(err =>{
      console.log(err);
      this._alertCtrl
      .create({
        title: 'Falha no cadastro',
        buttons: [{text:"ok"}],
        subTitle: "O email informado já está cadastrado"
      }).present();
    });
  }

  public authe()
  {
    return this.http.post("http://qfome.dev/api/user/auth",this.user)
    .map(resp => resp.json())
    .toPromise()
    .then(token=>{
      localStorage.setItem('token',token)
     this.navCtrl.setRoot(HomePage);  
    })
    .catch(err =>{
      console.log(err);
      this._alertCtrl
      .create({
        title: 'Falha na autenticação',
        buttons: [{text:"Tentar novamente"}],
        subTitle: "Credenciais informadas invalidas, tente novamente"
      }).present();
    });
    }
}
