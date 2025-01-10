import { Component, Input } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss'],
})
export class TravelModalComponent {
  @Input() travel: any;

  constructor(private travelService: TravelService, private modalController: ModalController) {}

  async save() {
    try {
      // Aguarde a resolução da Promise e obtenha o Observable
      const travelObservable = await this.travelService.updateTravel(this.travel.id, this.travel);
      travelObservable.subscribe(() => {
        this.modalController.dismiss(); // Fecha o modal após a atualização
      });
    } catch (error) {
      console.error('Erro ao atualizar a viagem:', error);
      // Aqui você pode adicionar um tratamento de erro, como um alerta ou toast
    }
  }

  dismiss() {
    this.modalController.dismiss(); // Fecha o modal
  }
}