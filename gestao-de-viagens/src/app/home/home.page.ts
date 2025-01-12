import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { TravelModalComponent } from '../travel-modal/travel-modal.component'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  travels: any[] = [];
  travelData: any = {
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
  };

  constructor(
    private travelService: TravelService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadTravels();
  }

  loadTravels() {
    this.travelService.getTravels().subscribe(
      (data) => {
        this.travels = data;
      },
      (error) => {
        this.showAlert('Erro', 'Não foi possível carregar as viagens.');
      }
    );
  }

  async saveTravel() {
    const loading = await this.loadingController.create({
      message: 'Salvando viagem...',
    });
    await loading.present();
  
    const travelToSave = {
      description: this.travelData.description,
      type: this.travelData.type,
      state: this.travelData.state,
      startAt: this.travelData.startAt ? this.travelData.startAt.toISOString() : null,
      endAt: this.travelData.endAt ? this.travelData.endAt.toISOString() : null,
    };
  
    const timeout = setTimeout(() => {
      loading.dismiss();
      this.showAlert('Erro', 'A operação está demorando muito. Tente novamente mais tarde.');
    }, 10000); // 10 segundos
  
    this.travelService.createTravel(travelToSave).subscribe(
      (data) => {
        clearTimeout(timeout); // Limpa o timeout se a operação for bem-sucedida
        console.log('Viagem salva com sucesso:', data);
        this.travels.push(data);
        loading.dismiss();
        this.travelData = { description: '', type: '', state: '', startAt: null, endAt: null };
        this.showAlert('Sucesso', 'Viagem salva com sucesso!');
        this.loadTravels();
      },
      (error) => {
        clearTimeout(timeout); // Limpa o timeout se houver um erro
        console.error('Erro ao salvar a viagem:', error);
        loading.dismiss();
        this.showAlert('Erro', 'Não foi possível salvar a viagem.');
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}