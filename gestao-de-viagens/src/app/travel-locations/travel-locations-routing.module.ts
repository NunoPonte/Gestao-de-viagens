import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelLocationsComponent } from './travel-locations.component';

const routes: Routes = [
  {
    path: '',
    component: TravelLocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelLocationsRoutingModule {}