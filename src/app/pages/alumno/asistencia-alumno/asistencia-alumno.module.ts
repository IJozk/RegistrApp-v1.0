import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaAlumnoPageRoutingModule } from './asistencia-alumno-routing.module';

import { AsistenciaAlumnoPage } from './asistencia-alumno.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [AsistenciaAlumnoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AsistenciaAlumnoPageRoutingModule,
        SharedModule
    ]
})
export class AsistenciaAlumnoPageModule {}
