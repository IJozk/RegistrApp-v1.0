import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
genQr() {
throw new Error('Method not implemented.');
}

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  nombre: string;
  email: string;
  clases: any;
  secciones: any;
  prox_clases: any;

    async ngOnInit() {
      try {
        let user: User = JSON.parse(localStorage.getItem('user'));
    
        if (user.rol == 'profesor' && user) {
          this.nombre = user.nombre;
          this.email = user.email;
          const fechaActual = new Date();
          const finDelDia = new Date(fechaActual);
          finDelDia.setHours(23, 59, 59, 999);
    
          this.getSeccionesInfo('secciones', this.email);
    
          const datosLocalStorage = localStorage.getItem('secciones');
    
          if (datosLocalStorage) {
            const conjuntoDeObjetos = JSON.parse(datosLocalStorage);
    
            const promesas = conjuntoDeObjetos.map(async (objetoActual) => {
              // Obtener las clases
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
    
              // Filtrar y mapear las próximas clases
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
    
            // Esperar a que todas las promesas se resuelvan
            await Promise.all(promesas);
          } else {
            console.log('No hay datos en el localStorage');
          }
        } else {
          this.utilsSvc.presentToast({
            message: `Acceso denegado`,
            duration: 1500,
            color: 'danger',
            position: 'middle',
            icon: 'person-circle-outline'
          })
          this.utilsSvc.routerLink('/auth');
        }
      } catch {
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


  async getSeccionesInfo(colection: string, correo_prof: string) {

    const loading = await this.utilsSvc.loading();
    await loading.present();
    const opcionesConsulta = {
      campo: "correo_prof",
      operador: "==",
      valor: correo_prof,
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


}
