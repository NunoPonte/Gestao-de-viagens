import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-local',
  templateUrl: './list-local.page.html',
  styleUrls: ['./list-local.page.scss'],
})
export class ListLocalPage implements OnInit {
  local: any[] = [];
  newComment: string = ''; // Definindo a propriedade newComment

  constructor(
    private localService: LocalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLocal();
  }
  loadLocal() {
    this.localService.getLocals().subscribe(
      (data) => {
        this.local = data;
      },
      (error) => {
        console.error('Erro ao carregar Locais', error);
      }
    );
  }
  async deleteLocal(id: string) {
    const loading = await this.loadingController.create({
      message: 'Deletando Local...',
    });
    await loading.present();

    this.localService.deleteLocal(id).subscribe(
      () => {
        loading.dismiss();
        this.loadLocal();
        this.showAlert('Sucesso', 'Local removido com sucesso!');
      },
      (error) => {
        loading.dismiss();
        this.showAlert('Erro', 'Não foi possível remover o local.');
      }
    );
  }
  goToUpdateLocal(id: string) {
    this.router.navigate(['/update-local/', id]);
  }

  goToLocalDetails(travelId: string) {
    this.router.navigate(['/local-details', travelId]);
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
