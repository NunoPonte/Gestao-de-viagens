import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LocalService } from '../services/local.service'; // Ajuste o caminho conforme necessário
import { TravelService } from '../services/travel.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-details-travel',
  templateUrl: './details-travel.page.html',
  styleUrls: ['./details-travel.page.scss'],
})
export class DetailsTravelPage implements OnInit {
  id!: string; // ID da viagem
  travelData: any = {
    description: '',
    type: '',
    state: '',
    startAt: null,
    endAt: null,
  };
  comments: { [key: string]: string } = {};
  travel: any[] = [];
  locations: any[] = []; // Array para armazenar as localizações
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService,
    private travelService: TravelService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!; // Obtém o ID da viagem da rota
    this.loadTravelDetails();
    this.loadLocations();
  }

  loadTravelDetails() {
    this.localService.getLocationsByTravelId(this.id).subscribe(
      (data) => {
        this.travel = data; // Armazena os detalhes da viagem recebidos da API
      },
      (error) => {
        console.error('Erro ao carregar detalhes da viagem', error);
      }
    );
  }

  // loadLocations() {
  //   this.localService.getLocationsByTravelId(this.id).subscribe(
  //     (data) => {
  //       this.locations = data; // Armazena as localizações recebidas da API
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar localizações', error);
  //     }
  //   );
  // }
  loadLocations() {
    this.localService.getLocationsByTravelId(this.id).subscribe(
      (data) => {
        this.locations = data.map((location: any) => ({
          ...location,
          comments: [], // Inicializa o array de comentários para cada localização
        }));
  
        // Para cada localização, busca seus comentários na API
        this.locations.forEach((location) => {
          this.localService.getCommentsByLocationId(location.id).subscribe(
            (comments) => {
              location.comments = comments; // Associa os comentários ao respectivo local
            },
            (error) => {
              console.error(`Erro ao carregar comentários para a localização ${location.id}:`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Erro ao carregar localizações:', error);
      }
    );
  }
  updateTravel() {
    this.router.navigate(['/update-travel', this.id]); // Navega para a página de atualização
  }

  deleteTravel() {
    this.travelService.deleteTravel(this.id).subscribe(
      () => {
        console.log('Viagem deletada com sucesso');
        this.router.navigate(['/list-travels']); // Redireciona para a lista de viagens
      },
      (error) => {
        console.error('Erro ao deletar a viagem', error);
      }
    );
  }

  addComment(localId: string) {
    const commentText = this.comments[localId]?.trim();
    if (!commentText.trim()) {
      alert('O comentário não pode estar vazio.'); // Alerta simples
      return;
    }
    
    const commentData = {
      locationId: localId, // ID da localização
      comment: commentText, // Texto do comentário
    };
    console.log(localId);
    console.log(commentData);
    this.localService.createComment(commentData).subscribe({
      next: () => {
        this.comments[localId] = ''; // Limpa o campo de entrada
        this.loadTravelDetails(); // Recarrega as viagens para obter os comentários atualizados
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
        this.loadTravelDetails(); // Recarrega as viagens para atualizar a lista de comentários
      },
      (error) => {
        loading.dismiss();
        this.errorHandler.handleError(error);
        this.notificationService.presentToast('Erro ao remover comentário.');
      }
    );
  }
}