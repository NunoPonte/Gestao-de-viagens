import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule],
  exports: [MapComponent],
})
export class SharedModule {}
