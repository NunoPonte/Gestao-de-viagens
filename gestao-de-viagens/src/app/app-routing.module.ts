import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page'; // Página inicial
import { UpdateTravelComponent } from './update-travel/update-travel.component';
import { DetailsTravelPage } from './details-travel/details-travel.page';

const routes: Routes = [
  { path: '', component: HomePage }, // Página inicial
  { path: 'home', component: HomePage },
  { path: 'create-travel', loadChildren: () => import('./create-travel/create-travel.module').then(m => m.CreateTravelPageModule) }, // Lazy loading para criar viagem
  { path: 'list-travels', loadChildren: () => import('./list-travels/list-travels.module').then(m => m.ListTravelsPageModule) }, // Lazy loading para listar viagens
  { path: 'update-travel/:id', component: UpdateTravelComponent },
  { path: 'local', loadChildren: () => import('./local/local.module').then(m => m.LocalPageModule) },
  { path: 'list-local', loadChildren: () => import('./list-local/list-local.module').then( m => m.ListLocalPageModule) },
  { path: 'details-travel', loadChildren: () => import('./details-travel/details-travel.module').then( m => m.DetailsTravelPageModule) },
  { path: 'details-travel/:id', component: DetailsTravelPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}