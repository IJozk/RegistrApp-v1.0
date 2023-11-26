import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCuentaPageRoutingModule } from './edit-cuenta-routing.module';

import { EditCuentaPage } from './edit-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCuentaPageRoutingModule
  ],
  declarations: [EditCuentaPage]
})
export class EditCuentaPageModule {}
