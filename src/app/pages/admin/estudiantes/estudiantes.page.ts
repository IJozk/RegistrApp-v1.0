import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  ngOnInit() {
    try{
      let user: User = JSON.parse(localStorage.getItem('user'));

        if (user.rol=='admin' && user) {

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
