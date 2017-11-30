import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html'
})
export class MinhaContaPage {

  constructor(public navCtrl: NavController) {
  }
  
  public goToRegisterPage()
  {
    this.navCtrl.push(CadastroPage);
  }

  public goToLoginPage()
{
  this.navCtrl.push(LoginPage);
}
}
