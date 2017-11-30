import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { CadastroPage } from '../cadastro/cadastro';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public http:Http,
    private _alertCtrl:AlertController) {
  }
  
  private url = "http://qfome.dev/api/user/auth";
  private credentials ={
    email:null,
    password:null
  }

  setCredentials(credentials)
  {
    this.credentials = credentials;
  }
  public auth()
  {
    return this.http.post(this.url,this.credentials)
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
  
    public goToRegisterPage()
    {
      this.navCtrl.push(CadastroPage);
    }
}
