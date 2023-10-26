import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  // Loading - Gestiona la espera y muestra una animacion cuando se llama una funcion asincronica
  loading(){
    return this.loadingCtrl.create( {spinner: 'crescent'})
  }

  // Toast - Gestiona la espera y muestra un mensaje cuando se realiza una funcion
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // Router - Enruta cualquier pagina disponible
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }
  
  // Guardar en local storage
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtenemos un elemento desde localstorage
  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }


}
