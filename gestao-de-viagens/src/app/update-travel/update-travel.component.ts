import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';

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
  newComment: string = ''; 
  travels: any[] = [];
  isEditing: boolean = false; // Flag para controlar o modo de edição

  constructor(
    private travelService: TravelService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id')!; // Usando '!' para garantir que não será null
    this.loadTravel();
  }

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

  onTravelChange(event: any) {
    this.travelId = event.detail.value; // Armazena o ID da viagem selecionada
    console.log('Viagem selecionada:', this.travelId);
    this.loadTravelDetails(this.travelId); // Carrega os detalhes da viagem selecionada
  }

  loadTravelDetails(travelId: string) {
    this.travelService.getTravelById(travelId).subscribe(
      (data) => {
        this.travelData = data; // Preenche os dados da viagem para edição
      },
      (error) => {
        console.error('Erro ao carregar detalhes da viagem', error);
      }
    );
  }

  loadSelectedTravel(id: string) {
    return this.travels.find(travel => travel.id === id);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Alterna o modo de edição
  }

  async updateTravel() {
    try {
      const updateObservable = await this.travelService.updateTravel(this.travelId, this.travelData);
      updateObservable.subscribe(
        () => {
          this.showAlert('Sucesso', 'Viagem atualizada com sucesso!');
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

  addComment() {
    if (!this.newComment.trim()) {
      alert('O comentário não pode estar vazio.'); // Alerta simples
      return;
    }
  
    this.travelService.createComment(this.travelId, this.newComment).subscribe({
      next: () => {
        this.newComment = ''; // Limpa o campo de entrada
        this.loadTravel(); // Recarrega as viagens para obter os comentários atualizados
      },
      error: (error) => {
        console.error('Erro ao adicionar comentário:', error);
      }
    });
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
        this.loadTravel(); // Recarrega as viagens para atualizar a lista de comentários
      },
      (error) => {
        loading.dismiss();
        this.errorHandler.handleError(error);
        this.notificationService.presentToast('Erro ao remover comentário.');
      }
    );
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