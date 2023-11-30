import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  nombre: string;
  email: string;
  inscripciones: any;
  secciones: any;
  
  async ngOnInit() {

    try{
      let user: User = JSON.parse(localStorage.getItem('user'));

        if (user.rol=='estudiante' && user) {
          this.nombre = user.nombre ;
          this.email = user.email;

          this.getInscripcionesInfo('inscripcion', this.email);
          const inscripciones = localStorage.getItem('inscripcion');
          
          if (inscripciones) {
            const c_secciones = JSON.parse(inscripciones);

            const promesas = c_secciones.map(async (objetoActual) => {

              const secciones = await this.firebaseSvc.obtenerDocumentos('secciones');
              localStorage.setItem('secciones', JSON.stringify(secciones));
      
              // Filtrar y mapear las clases actuales
              this.secciones = c_secciones
                .filter(seccion => {console.log('aca estoy');
                  console.log('ide de id_seccion: '+seccion['id_seccion']+'      id_inscripcion: '+objetoActual['id_seccion'])
                  return seccion['id_seccion'] == objetoActual['id_seccion'];
                }).map(seccion  => {
                  
                  return Object.assign({} ,seccion , {});
                })
            });
            await Promise.all(promesas);
          }else{
            null;
          };
        }else{
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

  async getInscripcionesInfo(colection: string, correo_est: string) {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    const opcionesConsulta = {
      campo: "correo_est",
      operador: "==",
      valor: correo_est,
    };


    this.firebaseSvc.obtenerDocsWhere(colection, opcionesConsulta).then((datos) => {

      localStorage.setItem(colection, JSON.stringify(datos));

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

  async getSeccionesInfo(colection: string) {

    const loading = await this.utilsSvc.loading();
    await loading.present();


    this.firebaseSvc.obtenerDocumentos(colection).then((datos) => {

      localStorage.setItem(colection, JSON.stringify(datos));

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



}
