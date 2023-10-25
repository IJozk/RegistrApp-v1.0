import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeEstudiantePageRoutingModule } from './home-estudiante-routing.module';

import { HomeEstudiantePage } from './home-estudiante.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEstudiantePageRoutingModule,
    SharedModule
  ],
  declarations: [HomeEstudiantePage]
})
export class HomeEstudiantePageModule {}
