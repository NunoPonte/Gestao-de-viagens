import { Component } from '@angular/core';
import { LocalService } from '../services/local.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TravelService } from '../services/travel.service';


@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage {
  localData = {
    travelId: '',
    description: '',
    type: '',
    state: '',
    map: '',
    startAt: null,
    endAt: null,
    createdBy: 'user@example.com', // Substitua pelo valor real
    prop1: '',
    prop2: '',
    prop3: '',
  };

  travels: any[] = [];
  selectedTravel= [];

  constructor(
    private localService: LocalService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private travelService: TravelService
  ) {}

  ngOnInit() {
    this.loadTravels();
  }

  async saveLocal() {
    const loading = await this.loadingController.create({
      message: 'Salvando viagem...',
    });
    await loading.present();

    const localToSave = {
      travelId: this.selectedTravel,
      description: this.localData.description,
      type: this.localData.type,
      state: this.localData.state,
      map: this.localData.map,
      startAt: this.localData.startAt ? new Date(this.localData.startAt).toISOString() : null,
      endAt: this.localData.endAt ? new Date(this.localData.endAt).toISOString() : null,
      createdBy: this.localData.createdBy,
      prop1: this.localData.prop1,
      prop2: this.localData.prop2,
      prop3: this.localData.prop3,
    };

    this.localService.createLocal(localToSave).subscribe(
      (data) => {
        loading.dismiss();
        this.localData = { travelId: '', description: '', type: '', state: '', map: '', startAt: null, endAt: null, createdBy: '', prop1: '', prop2: '', prop3: ''}; // Limpa o formulário
        this.showAlert('Sucesso', 'Local salvo com sucesso!');
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

  loadTravels() {
    this.travelService.getTravels().subscribe(
      (data) => {
        this.travels = data; // Armazena os dados recebidos da API
      },
      (error) => {
        console.error('Erro ao carregar frutas', error);
      }
    );
  }

  onTravelChange(event: any) {
    this.selectedTravel = event.detail.value; // Armazena a fruta selecionada
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
