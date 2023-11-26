import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {

  utilsSvc = inject(UtilsService);
  nombre: string;
  email: string;
  
  ngOnInit() {

    try{
      let user: User = JSON.parse(localStorage.getItem('user'));

        if (user.rol=='estudiante' && user) {
          this.nombre = user.nombre ;
          this.email = user.email;
        }
        else{
          this.utilsSvc.presentToast({
            message: `Acceso denegado`,
            duration: 1500,
            color: 'danger',
            position: 'middle',
            icon: 'person-circle-outline'
          })
          this.utilsSvc.routerLink('/auth');
        }
      }
      catch{
        this.utilsSvc.presentToast({
          message: `Debes ingresar con tus credenciales primero!!`,
          duration: 2000,
          color: 'danger',
          position: 'middle',
          icon: 'person-circle-outline'
        })
        this.utilsSvc.routerLink('/auth');
      }

  }
}
