import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
})
export class HomeEstudiantePage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  nombre: string;
  email: string;
  clases: any;
  prox_clases: any;
  
  async ngOnInit() {

    try{
      let user: User = JSON.parse(localStorage.getItem('user'));

        if (user.rol=='estudiante' && user) {
          this.nombre = user.nombre ;
          this.email = user.email;
          const fechaActual = new Date();
          const finDelDia = new Date(fechaActual);
          finDelDia.setHours(23, 59, 59, 999);


          this.getInscripcionesInfo('inscripcion',user.email);

          const inscripciones = localStorage.getItem('inscripcion');

          if (inscripciones) {
            const c_inscripciones = JSON.parse(inscripciones);

            const promesas = c_inscripciones.map(async (objetoActual) => {

              const clases = await this.firebaseSvc.obtenerDocumentos('clases');
              localStorage.setItem('clases', JSON.stringify(clases));
      
              // Filtrar y mapear las clases actuales
              this.clases = clases
                .filter(clase => {
                  const tiempoEnMilisegundos = clase['hora_ini'].seconds * 1000 + clase['hora_ini'].nanoseconds / 1e6;
                  const fechaInicio = new Date(tiempoEnMilisegundos);
      
                  const tiempoFin = clase['hora_fin'].seconds * 1000 + clase['hora_fin'].nanoseconds / 1e6;
                  const fechaFin = new Date(tiempoFin);
      
                  return fechaInicio < fechaActual && fechaFin >= fechaActual && clase['id_seccion'] == objetoActual['id_seccion'];
                })
                .map(clase => {
                  const tiempoInicio = clase['hora_ini'].seconds * 1000 + clase['hora_ini'].nanoseconds / 1e6;
                  const fechaInicio = new Date(tiempoInicio);
      
                  const tiempoFin = clase['hora_fin'].seconds * 1000 + clase['hora_fin'].nanoseconds / 1e6;
                  const fechaFin = new Date(tiempoFin);
      
                  return Object.assign({}, clase, { hora_ini: fechaInicio, hora_fin: fechaFin });
                }); 


                const datos2 = await this.firebaseSvc.obtenerDocumentos('clases');
                localStorage.setItem('prox_clases', JSON.stringify(datos2));
        
                this.prox_clases = datos2
                  .filter(clase2 => {
                    const tiempoEnMilisegundos = clase2['hora_ini'].seconds * 1000 + clase2['hora_ini'].nanoseconds / 1e6;
                    const fechaInicio = new Date(tiempoEnMilisegundos);
        
                    const tiempoFin = clase2['hora_fin'].seconds * 1000 + clase2['hora_fin'].nanoseconds / 1e6;
                    const fechaFin = new Date(tiempoFin);
        
                    return fechaInicio > fechaActual && fechaFin <= finDelDia && clase2['id_seccion'] == objetoActual['id_seccion'];
                  })
                  .map(clase2 => {
                    const tiempoInicio = clase2['hora_ini'].seconds * 1000 + clase2['hora_ini'].nanoseconds / 1e6;
                    const fechaInicio = new Date(tiempoInicio);
        
                    const tiempoFin = clase2['hora_fin'].seconds * 1000 + clase2['hora_fin'].nanoseconds / 1e6;
                    const fechaFin = new Date(tiempoFin);
        
                    return Object.assign({}, clase2, { hora_ini: fechaInicio, hora_fin: fechaFin });
                  });

            });
            await Promise.all(promesas);
          }
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


}
