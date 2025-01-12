import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLocalPage } from './update-local.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLocalPageRoutingModule {}
