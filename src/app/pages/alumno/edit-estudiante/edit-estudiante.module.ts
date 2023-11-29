import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEstudiantePageRoutingModule } from './edit-estudiante-routing.module';

import { EditEstudiantePage } from './edit-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEstudiantePageRoutingModule
  ],
  declarations: [EditEstudiantePage]
})
export class EditEstudiantePageModule {}
