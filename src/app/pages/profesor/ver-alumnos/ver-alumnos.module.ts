import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAlumnosPageRoutingModule } from './ver-alumnos-routing.module';

import { VerAlumnosPage } from './ver-alumnos.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [VerAlumnosPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerAlumnosPageRoutingModule,
        SharedModule
    ]
})
export class VerAlumnosPageModule {}
