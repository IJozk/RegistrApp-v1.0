import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.page.html',
  styleUrls: ['./ver-alumnos.page.scss'],
})
export class VerAlumnosPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  estudiantes: any;

  ngOnInit() {
    const datosLocalStorage = localStorage.getItem('estudiantes');
    this.estudiantes = datosLocalStorage ? JSON.parse(datosLocalStorage): [];
  }
}
