// src/app/travel-locations/travel-location.model.ts

export class TravelLocation {
    constructor(
      public id: string,
      public travelId: string,
      public description: string,
      public type: string,
      public state: string,
      public map: string, // URL ou coordenadas do mapa
      public startAt: Date,
      public endAt: Date,
      public createdBy: string, // ID do usuário que criou
      public prop1: string,
      public prop2: string,
      public prop3: string,
      public isFav: boolean,
      public latitude?: string, // Adicionando latitude
      public longitude?: string  // Adicionando longitude
    ) {}
  }

  // src/app/travel-locations/location-comment.model.ts

export class LocationComment {
    constructor(
      public id: string,
      public locationId: string,
      public comment: string
    ) {}
  }