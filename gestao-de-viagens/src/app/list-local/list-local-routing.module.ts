import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListLocalPage } from './list-local.page';

const routes: Routes = [
  {
    path: '',
    component: ListLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListLocalPageRoutingModule {}
