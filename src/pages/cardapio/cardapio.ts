import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restaurant } from '../../domain/restaurant/restaurant';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
/**
 * Generated class for the CardapioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  private url = "http://qfome.dev/api/restaurant/menu";
  public restaurant:Restaurant;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _http:Http,
  private _loadingCtrl:LoadingController,
  private _alertCtrl:AlertController)
  {
    this.restaurant = navParams.get('restaurantSelected');
  }
private menu ={
  id:null,
  restaurante_id:null,
  nome:null,
  tipo:null,
  ingredientes:null,
  observacao:null,
  preco:null,
  img_url:null
}
  ngOnInit()
  {

    let loader = this._loadingCtrl.create({
      content:"Buscando cardapio..",
       
    });
    loader.present();
    console.log("ID "+this.restaurant.id);
    let params ={
      id:this.restaurant.id,
    }
    this._http.post(this.url,params)
    .map(resp => resp.json())
    .toPromise()
    .then(cardapio=>{
      this.menu = cardapio;
      loader.dismiss();
      console.log(this.menu);
    
    })
    .catch(err=>{
      console.log(err);
      this._alertCtrl
      .create({
        title:"Falha ao listar cardapio",
        buttons: [{text:"tentar novamente"}],
        subTitle:"Nao foi possivel obter a lista de cardapios"
      }).present();
    })
  }

}
