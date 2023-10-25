import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {


  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z ]*')]),
    rol: new FormControl(''),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }


  isLike(source: string, pattern: string): boolean {
    const regex = new RegExp(pattern.replace(/%/g, '.*'), 'i');
    return regex.test(source);
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.registro(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.nombre);
        let uid = res.user.uid;

        if (this.isLike(res.user.email,'@profesor.com')){
          let rol = 'profesor';
          this.form.controls.rol.setValue(rol);
        }
        else{
          let rol = 'estudiante';
          this.form.controls.rol.setValue(rol);
        }

        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);
        

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

  async setUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilsSvc.saveInLocalStorage('user', this.form.value);
      if (this.form.value.rol=='profesor'){
        this.utilsSvc.routerLink('/main/home');
      }
      else{
        this.utilsSvc.routerLink('/main/home-estudiante');
      }
      
      this.form.reset();

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

}
