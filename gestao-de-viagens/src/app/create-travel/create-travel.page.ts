import { Component } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage {
  travelData = {
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
    createdBy: 'user@example.com', // Substitua pelo valor real
    prop1: '',
    prop2: '',
    prop3: '',
    isFav: false,
  };

  constructor(
    private travelService: TravelService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
  ) {}

  async saveTravel() {
    const loading = await this.loadingController.create({
      message: 'Salvando viagem...',
    });
    await loading.present();

    const travelToSave = {
      description: this.travelData.description,
      type: this.travelData.type,
      state: this.travelData.state,
      startAt: this.travelData.startAt ? new Date(this.travelData.startAt).toISOString() : null,
      endAt: this.travelData.endAt ? new Date(this.travelData.endAt).toISOString() : null,
      createdBy: this.travelData.createdBy,
      prop1: this.travelData.prop1,
      prop2: this.travelData.prop2,
      prop3: this.travelData.prop3,
      isFav: this.travelData.isFav,
    };

    this.travelService.createTravel(travelToSave).subscribe(
      (data) => {
        loading.dismiss();
        this.travelData = { description: '', type: '', state: '', startAt: null, endAt: null, createdBy: '', prop1: '', prop2: '', prop3: '', isFav: false }; // Limpa o formulário
        this.showAlert('Sucesso', 'Viagem salva com sucesso!');
        this.router.navigate(['/list-travels']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        loading.dismiss();
        this.showAlert('Erro', 'Não foi possível salvar a viagem.');
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}