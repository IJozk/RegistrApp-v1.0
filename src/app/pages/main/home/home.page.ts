import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilsSvc = inject(UtilsService);

  ngOnInit() {

    let user: User = JSON.parse(localStorage.getItem('user'));


      if (user.rol=='profesor') {
        
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
