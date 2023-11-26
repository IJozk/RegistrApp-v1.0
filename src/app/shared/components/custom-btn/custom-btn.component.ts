import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-custom-btn',
  templateUrl: './custom-btn.component.html',
  styleUrls: ['./custom-btn.component.scss'],
})
export class CustomBtnComponent  implements OnInit {

  @Input() ruta1!: string;
  @Input() nameBtn: string;
  @Input() label!: string;


  constructor() { }

  ngOnInit() {}

}
