import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton: string;
  @Input() logOutBtn: string;
  @Input() disabled!: string;

  utilsSvc = inject(UtilsService);
  
  ngOnInit() {}

  logOut() {
    localStorage.clear();
    this.utilsSvc.routerLink('/');
  }

}
