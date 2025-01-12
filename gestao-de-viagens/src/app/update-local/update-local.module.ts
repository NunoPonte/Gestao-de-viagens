import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLocalPageRoutingModule } from './update-local-routing.module';

import { UpdateLocalPage } from './update-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLocalPageRoutingModule
  ],
  declarations: [UpdateLocalPage]
})
export class UpdateLocalPageModule {}
