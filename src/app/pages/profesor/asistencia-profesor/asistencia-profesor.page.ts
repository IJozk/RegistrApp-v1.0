import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asistencia-profesor',
  templateUrl: './asistencia-profesor.page.html',
  styleUrls: ['./asistencia-profesor.page.scss'],
})
export class AsistenciaProfesorPage implements OnInit {


verAlumnos( id_seccion: string) {
  console.log(id_seccion);
  this.getEstudiantesInfo('estudiantes',id_seccion);
  this.utilsSvc.routerLink('/ver-alumnos');
}

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  nombre: string;
  email: string;
  secciones: any;

  ngOnInit() {
    this.inicializar();
  }

  async inicializar() {

    try{
        let user: User = JSON.parse(localStorage.getItem('user'));
        if (user.rol == 'profesor' && user) {
          this.nombre = user.nombre;
          this.email = user.email;
          
          await this.cargarDatosLocalStorage('secciones', this.email);

          console.log(this.secciones);
          
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

    async getEstudiantesInfo(colection: string, id_seccion: string) {

      console.log('seccion:'+id_seccion);

      const loading = await this.utilsSvc.loading();
      await loading.present();
      const opcionesConsulta = {
        campo: "id_seccion",
        operador: "==",
        valor: id_seccion.trim(),
      };


      this.firebaseSvc.obtenerDocsWhere('inscripcion', opcionesConsulta ).then((datos) => {
        console.log(datos);
        localStorage.setItem('estudiantes', JSON.stringify(datos));

      }).catch(error => {
        console.log(error)

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })
    }



    async cargarDatosLocalStorage(colection: string, filtro: string) {
      return new Promise<void>((resolve) => {
      try {
        // Implementa lógica para obtener datos de localStorage
        const datosLocalStorage = localStorage.getItem(colection);
        this.secciones = datosLocalStorage ? JSON.parse(datosLocalStorage) : [];
        resolve();
      } catch (error) {
        console.error('Error al cargar datos del localStorage:', error);
        resolve();
      }
    })
  }


  }
  

