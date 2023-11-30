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
  secciones2: any[] = [];
  asistencias: any;
  clases2 : any;
  asist: any;
  
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
              const secciones2 = await this.firebaseSvc.obtenerDocumentos('secciones');
              localStorage.setItem('secciones2', JSON.stringify(secciones2));
          
              // Filtrar y mapear las clases actuales
              this.secciones2 = c_secciones
                  .map(seccion => {
                    if (seccion['id_seccion'] === objetoActual['id_seccion']) {
                      // Agrega propiedades de objetoActual a seccion solo si cumplen con la condición
                      return { ...seccion, ...objetoActual };
                  } else {
                      return seccion;
                  }
                  });
          
              console.log(this.secciones2.length);
          });
          
          await Promise.all(promesas);
          
          }
          else{
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

  async getClasesInfo(colection: string, id_seccion: string) {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    const opcionesConsulta = {
      campo: "id_seccion",
      operador: "==",
      valor: id_seccion,
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


  async verAsist(id: any, id_seccion: string){


    let doc= document.getElementById(id);
  

    this.asist = JSON.parse(localStorage.getItem(this.asistencias));
    this.getInscripcionesInfo('asistencias', this.email);
    const inscripciones = localStorage.getItem('asistencias');

    if (inscripciones) {
    const c_secciones = JSON.parse(inscripciones);

    const promesas = c_secciones.map(async (objetoActual) => {

    const datos2 = await this.firebaseSvc.obtenerDocsWhere ('clases', {
      campo: "id_seccion",
      operador: "==",
      valor: id_seccion,
    });
    localStorage.setItem('clases2', JSON.stringify(datos2));

    this.clases2 = datos2
      .map(clase2 => {
        if (clase2['id_seccion'] === objetoActual['id_seccion'] && clase2['id_seccion'] === objetoActual['id_seccion']) {
        const tiempoInicio = clase2['hora_ini'].seconds * 1000 + clase2['hora_ini'].nanoseconds / 1e6;
        const fechaInicio = new Date(tiempoInicio);

        const tiempoFin = clase2['hora_fin'].seconds * 1000 + clase2['hora_fin'].nanoseconds / 1e6;
        const fechaFin = new Date(tiempoFin);

        return Object.assign({}, clase2, { hora_ini: fechaInicio, hora_fin: fechaFin });
      }       
      else {
        return clase2;
    }
      });
    })
    await Promise.all(promesas);
  }

    if(doc.classList.contains("ion-hide")){
      
    doc.classList.remove("ion-hide");

    }
    else{
      doc.classList.add("ion-hide");
    }
  }
}

