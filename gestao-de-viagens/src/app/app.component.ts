import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navCtrl: NavController) {}

  openCreateTravel() {
    this.navCtrl.navigateForward('/home'); // Navega para a página de criação de viagem
  }

  openListTravels() {
    this.navCtrl.navigateForward('/home'); // Navega para a página de listagem de viagens
  }
}