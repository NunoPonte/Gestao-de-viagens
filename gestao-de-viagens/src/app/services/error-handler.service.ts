import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private alertController: AlertController) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  handleError(error: any) {
    console.error('An error occurred:', error); // Log do erro no console

    // Aqui você pode personalizar a mensagem de erro com base no tipo de erro
    let message = 'Ocorreu um erro inesperado.';

    if (error.error && error.error.message) {
      message = error.error.message; // Mensagem de erro da API, se disponível
    }

    // Apresenta um alerta com a mensagem de erro
    this.presentAlert('Erro', message);
  }
}