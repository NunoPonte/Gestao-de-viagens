import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelLocationService } from './travel-location.service';
import { TravelLocation } from './travel-location.model';

@Component({
  selector: 'app-travel-locations',
  templateUrl: './travel-locations.component.html',
  styleUrls: ['./travel-locations.component.scss'],
})
export class TravelLocationsComponent implements OnInit {
  travelId!: string; // Usando o operador '!' para indicar que será inicializado mais tarde
  locations: TravelLocation[] = [];
  newLocation: TravelLocation = new TravelLocation('', '', '', '', '', '', new Date(), new Date(), '', '', '', '', false);

  constructor(
    private route: ActivatedRoute,
    private travelLocationService: TravelLocationService
  ) {}

  ngOnInit() {
    // Obter o travelId da rota
    const travelIdParam = this.route.snapshot.paramMap.get('id');
    if (travelIdParam) {
      this.travelId = travelIdParam; // Atribuir o valor ao travelId
      this.loadLocations(); // Carregar os locais após obter o travelId
    } else {
      console.error('ID da viagem não encontrado na rota.');
    }
  }

  loadLocations() {
    this.travelLocationService.getLocationsByTravelId(this.travelId).subscribe(
      (data) => {
        this.locations = data; // Armazenar os locais na propriedade locations
      },
      (error) => {
        console.error('Erro ao carregar locais de viagem', error);
      }
    );
  }

  addLocation() {
    this.newLocation.travelId = this.travelId; // Associar o local à viagem
    this.travelLocationService.addLocation(this.newLocation).subscribe(
      (location) => {
        this.locations.push(location); // Adicionar o novo local à lista
        this.newLocation = new TravelLocation('', '', '', '', '', '', new Date(), new Date(), '', '', '', '', false); // Resetar o formulário
      },
      (error) => {
        console.error('Erro ao adicionar local', error);
      }
    );
  }

  deleteLocation(locationId: string) {
    this.travelLocationService.deleteLocation(locationId).subscribe(
      () => {
        this.locations = this.locations.filter(location => location.id !== locationId); // Remover o local da lista
      },
      (error) => {
        console.error('Erro ao deletar local', error);
      }
    );
  }
}