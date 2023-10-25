import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.page.html',
  styleUrls: ['./home-estudiante.page.scss'],
})
export class HomeEstudiantePage implements OnInit {

  utilsSvc = inject(UtilsService);

  ngOnInit() {

    let user: User = JSON.parse(localStorage.getItem('user'));


      if (user.rol=='estudiante') {
        
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

}

