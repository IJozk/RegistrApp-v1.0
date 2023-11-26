import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-cuenta',
  templateUrl: './edit-cuenta.page.html',
  styleUrls: ['./edit-cuenta.page.scss'],
})
export class EditCuentaPage implements OnInit {
  
  utilsSvc = inject(UtilsService);
  nombre: string;
  email: string;

  constructor() { }

  ngOnInit() {

    try{
      let user: User = JSON.parse(localStorage.getItem('user'));

        if (user.rol=='profesor' && user) {
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
