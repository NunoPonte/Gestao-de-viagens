import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TravelModalComponent } from './travel-modal/travel-modal.component'; // Importando o TravelModalComponent
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { HomePage } from './home/home.page';
import { UpdateTravelComponent } from './update-travel/update-travel.component';

@NgModule({
  declarations: [
    AppComponent,
    TravelModalComponent,
    HomePage,
    UpdateTravelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Adicionando FormsModule aqui
    IonicModule.forRoot(), // Certifique-se de que o IonicModule está aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}