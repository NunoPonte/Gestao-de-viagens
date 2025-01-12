import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-update-local',
  templateUrl: './update-local.page.html',
  styleUrls: ['./update-local.page.scss'],
})
export class UpdateLocalPage implements OnInit {
  localId!: string; // Inicializa o ID do local
  localData: any = {
    id: '',
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
  };
  locals: any[] = [];

  constructor(
    private localService: LocalService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.localId = this.route.snapshot.paramMap.get('id')!; // Garantir que o localId está sendo obtido da URL
    this.loadLocals(); // Carregar todos os locais
  }

  loadLocals() {
    this.localService.getLocals().subscribe(
      (data) => {
        this.locals = data;
        if (this.localId) {
          this.loadSelectedLocal(this.localId); // Carregar o local selecionado após carregar todos os locais
        } else {
          this.showAlert('Erro', 'ID de local não fornecido.');
        }
      },
      (error) => {
        console.error('Erro ao carregar locais:', error);
        this.showAlert('Erro', 'Não foi possível carregar os locais.');
      }
    );
  }

  loadSelectedLocal(id: string) {
    const selectedLocal = this.locals.find(local => local.id === id);
    if (selectedLocal) {
      this.localData = { ...selectedLocal }; // Preencher os dados do local selecionado
    } else {
      this.showAlert('Erro', 'Local não encontrado.');
    }
  }

  onLocalChange(event: any) {
    this.localId = event.detail.value; // Atualiza o localId com o valor selecionado
    this.loadSelectedLocal(this.localId); // Carregar os detalhes do local após a mudança
  }

  async updateLocal(localId: string) {
    try {
      const updateObservable = this.localService.updateLocal(localId, this.localData); // Atualiza o local com o localId correto
      updateObservable.subscribe(
        () => {
          this.showAlert('Sucesso', 'Local atualizado com sucesso!');
          this.router.navigate(['/list-travels']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Erro ao atualizar o local:', error);
          this.showAlert('Erro', 'Não foi possível atualizar o local.');
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar o local:', error);
      this.showAlert('Erro', 'Não foi possível atualizar o local.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header : header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
