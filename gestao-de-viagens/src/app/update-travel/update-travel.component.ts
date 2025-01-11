import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { TravelLocationService } from '../travel-locations/travel-location.service';

@Component({
  selector: 'app-update-travel',
  templateUrl: './update-travel.component.html',
  styleUrls: ['./update-travel.component.scss'],
})
export class UpdateTravelComponent implements OnInit {
  travelId!: string; 
  travelData: any = {
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
    locations: [],
    comments: []
  };
  newComment: string = ''; 
  travels: any[] = [];
  isEditing: boolean = false;

  constructor(
    private travelService: TravelService,
    private travelLocationService: TravelLocationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id')!;
    this.loadTravel();
  }

  loadTravel() {
    this.travelService.getTravels().subscribe(
      (data) => {
        this.travelData = data.find(travel => travel.id === this.travelId) || {};
        if (!this.travelData) {
          this.showAlert('Erro', 'Viagem não encontrada.');
        } else {
          this.loadTravelLocations();
        }
      },
      (error) => {
        console.error('Erro ao carregar viagens:', error);
        this.showAlert('Erro', 'Não foi possível carregar as viagens.');
      }
    );
  }

  loadTravelLocations() {
    this.travelLocationService.getLocationsByTravelId(this.travelId).subscribe(
      (locations) => {
        this.travelData.locations = locations;
      },
      (error) => {
        console.error('Erro ao carregar locais:', error);
        this.showAlert('Erro', 'Não foi possível carregar os locais da viagem.');
      }
    );
  }

  // Método editLocation adicionado aqui
  editLocation(location: any) {
    console.log('Editar localização:', location);
    // Aqui você pode adicionar a lógica de edição ou navegação para outra página
    // Exemplo: this.router.navigate(['/edit-location', location.id]);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async updateTravel() {
    try {
      await this.travelService.updateTravel(this.travelId, this.travelData);
      this.showAlert('Sucesso', 'Viagem atualizada com sucesso!');
      this.router.navigate(['/list-travels']);
    } catch (error) {
      console.error('Erro ao atualizar a viagem:', error);
      this.showAlert('Erro', 'Não foi possível atualizar a viagem.');
    }
  }

  addComment() {
    if (!this.newComment.trim()) {
      alert('O comentário não pode estar vazio.');
      return;
    }

    this.travelService.createComment(this.travelId, this.newComment).subscribe(() => {
      this.newComment = '';
      this.loadTravel();
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
        this.loadTravel();
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
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
