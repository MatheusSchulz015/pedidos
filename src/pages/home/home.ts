import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { Restaurant } from '../../domain/restaurant/restaurant';
import { Http } from '@angular/http';
import { CardapioPage } from '../cardapio/cardapio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public restaurants:Restaurant[];
  constructor(public navCtrl: NavController,
    private _http:Http,
    private _loadingCtrl:LoadingController,
    private _alertCtrl:AlertController
  ){}

  ngOnInit()
  {

    let loader = this._loadingCtrl.create({
      content: 'Listando restaurantes...'
    });
    loader.present();
    this._http.get("http://qfome.dev/api/restaurants")
    .map(resp => resp.json())
    .toPromise()
    .then(restaurants=>{
      this.restaurants = restaurants;
      loader.dismiss();
      console.log(this.restaurants);
    })
    .catch(err =>{
      console.log(err);
      this._alertCtrl
      .create({
        title: 'Falha na conexão',
        buttons: [{text:"Estou ciente!"}],
        subTitle: "Não foi possivel obter a lista de restaurantes. Tente novamente."
      }).present();
    });
}

public select(restaurant)
{
  //passando o restaurante selecionado para a pagina de cardapios
  this.navCtrl.push(CardapioPage,{restaurantSelected:restaurant});
}
}
