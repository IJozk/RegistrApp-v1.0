import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrPageRoutingModule } from './scan-qr-routing.module';

import { ScanQrPage } from './scan-qr.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [ScanQrPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ScanQrPageRoutingModule,
        SharedModule
    ]
})
export class ScanQrPageModule {}
