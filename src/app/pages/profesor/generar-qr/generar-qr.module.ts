import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarQrPageRoutingModule } from './generar-qr-routing.module';
import { GenerarQrPage } from './generar-qr.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarQrPageRoutingModule,
    SharedModule
  ],
  declarations: [GenerarQrPage]
})
export class GenerarQrPageModule {}
