import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-travel',
  templateUrl: './update-travel.component.html',
  styleUrls: ['./update-travel.component.scss'],
})
export class UpdateTravelComponent implements OnInit {
  travelId!: string; // Usando o operador '!' para indicar que será inicializado mais tarde
  travelData: any = {
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
  };
  travels: any[] = [];

  constructor(
    private travelService: TravelService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id')!; // Usando '!' para garantir que não será null
    this.loadTravel();
  }

  // async loadTravel() {
  //   try {
  //     const travelObservable = await this.travelService.getTravelById(this.travelId);
  //     travelObservable.subscribe(
  //       (data) => {
  //         this.travelData = data; // Carrega os dados da viagem
  //       },
  //       (error) => {
  //         console.error('Erro ao carregar a viagem:', error);
  //         this.showAlert('Erro', 'Não foi possível carregar a viagem.');
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Erro ao carregar a viagem:', error);
  //     this.showAlert('Erro', 'Não foi possível carregar a viagem.');
  //   }
  // }
  // Carregar todas as viagens
  loadTravel() {
    this.travelService.getTravels().subscribe(
      (data) => {
        this.travels = data;
        const selectedTravel = this.loadSelectedTravel(this.travelId);
        if (selectedTravel) {
          this.travelData = selectedTravel; // Carregar os dados da viagem
        } else {
          this.showAlert('Erro', 'Viagem não encontrada.');
        }
      },
      (error) => {
        console.error('Erro ao carregar viagens:', error);
        this.showAlert('Erro', 'Não foi possível carregar as viagens.');
      }
    );
  }
  // Carregar a viagem selecionada a partir da lista
  loadSelectedTravel(id: string) {
    return this.travels.find(travel => travel.id === id);
  }

  async updateTravel() {
    try {
      const updateObservable = await this.travelService.updateTravel(this.travelId, this.travelData);
      updateObservable.subscribe(
        () => {
          this.showAlert('Sucesso', 'Viagem atualizada com sucesso!');
          //this.router.navigate(['/list-travels']); 
          this.router.navigate(['/list-travels']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Erro ao atualizar a viagem:', error);
          this.showAlert('Erro', 'Não foi possível atualizar a viagem.');
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar a viagem:', error);
      this.showAlert('Erro', 'Não foi possível atualizar a viagem.');
    }
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