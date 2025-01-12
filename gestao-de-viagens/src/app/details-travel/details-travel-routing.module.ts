import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTravelPage } from './details-travel.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsTravelPageRoutingModule {}
