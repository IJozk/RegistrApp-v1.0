import { Component, OnInit, inject } from '@angular/core';
import { Ramo } from 'src/app/models/ramo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.page.html',
  styleUrls: ['./ramos.page.scss'],
})
export class RamosPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  ngOnInit() {
  }


  async getRamosInfo(cod_ramo: string) {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `ramos/${cod_ramo}`;

    this.firebaseSvc.getDocument(path).then((ramo: Ramo) => {
      
      this.utilsSvc.saveInLocalStorage('ramo', ramo);

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
