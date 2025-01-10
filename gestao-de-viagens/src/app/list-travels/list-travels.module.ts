import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTravelsPageRoutingModule } from './list-travels-routing.module';

import { ListTravelsPage } from './list-travels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTravelsPageRoutingModule
  ],
  declarations: [ListTravelsPage]
})
export class ListTravelsPageModule {}
