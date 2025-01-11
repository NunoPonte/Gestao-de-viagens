import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelLocationsRoutingModule } from './travel-locations-routing.module';
import { TravelLocationsComponent } from './travel-locations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelLocationsRoutingModule,
  ],
  declarations: [TravelLocationsComponent],
})
export class TravelLocationsModule {}