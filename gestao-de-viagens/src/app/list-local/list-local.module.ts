import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListLocalPageRoutingModule } from './list-local-routing.module';

import { ListLocalPage } from './list-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListLocalPageRoutingModule
  ],
  declarations: [ListLocalPage]
})
export class ListLocalPageModule {}
