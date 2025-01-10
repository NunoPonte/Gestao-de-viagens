import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController,
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

  async loadTravels() {
    try {
      const travelsObservable = await this.travelService.getTravels();
      travelsObservable.subscribe(
        (data) => {
          this.travels = data;
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.notificationService.presentToast('Erro ao carregar viagens.');
        }
      );
    } catch (error) {
      this.errorHandler.handleError(error);
      this.notificationService.presentToast('Erro ao carregar viagens.');
    }
  }

  async addComment(travelId: string) {
    if (!this.newComment.trim()) {
      this.notificationService.presentToast('O comentário não pode estar vazio.');
      return;
    }

    this.travelService.createComment(travelId, this.newComment).subscribe(
      () => {
        this.notificationService.presentToast('Comentário adicionado com sucesso!');
        this.newComment = ''; // Limpa o campo de comentário
        this.loadTravels(); // Recarrega as viagens para mostrar o novo comentário
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.notificationService.presentToast('Erro ao adicionar comentário.');
      }
    );
  }

  async deleteComment(commentId: string) {
    const loading = await this.loadingController.create({
      message: 'Deletando comentário...',
    });
    await loading.present();

    this.travelService.deleteComment(commentId).subscribe(
      () => {
        loading.dismiss();
        this.notificationService.presentToast('Comentário removido com sucesso!');
        this.loadTravels(); // Recarrega as viagens para atualizar a lista de comentários
      },
      (error) => {
        loading.dismiss();
        this.errorHandler.handleError(error);
        this.notificationService.presentToast('Erro ao remover comentário.');
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
    this.router.navigate(['/update-travel', id]);
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