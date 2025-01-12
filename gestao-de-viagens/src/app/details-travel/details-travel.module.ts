import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTravelPageRoutingModule } from './details-travel-routing.module';

import { DetailsTravelPage } from './details-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTravelPageRoutingModule
  ],
  declarations: [DetailsTravelPage]
})
export class DetailsTravelPageModule {}
