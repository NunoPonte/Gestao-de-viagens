import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-travels',
  templateUrl: './list-travels.page.html',
  styleUrls: ['./list-travels.page.scss'],
})
export class ListTravelsPage implements OnInit {
  travels: any[] = [];
  newComment: string = ''; // Definindo a propriedade newComment

  constructor(
    private travelService: TravelService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTravels();
  }

  // async loadTravels() {
  //   try {
  //     const travelsObservable = await this.travelService.getTravels();
  //     travelsObservable.subscribe(
  //       (data) => {
  //         this.travels = data;
  //       },
  //       (error) => {
  //         this.errorHandler.handleError(error);
  //         this.notificationService.presentToast('Erro ao carregar viagens.');
  //       }
  //     );
  //   } catch (error) {
  //     this.errorHandler.handleError(error);
  //     this.notificationService.presentToast('Erro ao carregar viagens.');
  //   }
  // }
  loadTravels() {
    this.travelService.getTravels().subscribe(
      (data) => {
        this.travels = data;
      },
      (error) => {
        console.error('Erro ao carregar viagens', error);
      }
    );
  }

    

  async deleteTravel(id: string) {
    const loading = await this.loadingController.create({
      message: 'Deletando viagem...',
    });
    await loading.present();

    this.travelService.deleteTravel(id).subscribe(
      () => {
        loading.dismiss();
        this.loadTravels();
        this.showAlert('Sucesso', 'Viagem removida com sucesso!');
      },
      (error) => {
        loading.dismiss();
        this.showAlert('Erro', 'Não foi possível remover a viagem.');
      }
    );
  }

  goToUpdateTravel(id: string) {
    this.router.navigate(['/update-travel/', id]);
  }

  goToTravelDetails(travelId: string) {
    this.router.navigate(['/travel-details', travelId]);
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