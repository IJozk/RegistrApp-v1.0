import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {

  imageUrl: any;

  constructor() {}

  ngOnInit() {
    const imagePath = '../../../assets/images/imagesapp/registrapplogo.png'; 
    this.imageUrl =  imagePath;
  }

}
