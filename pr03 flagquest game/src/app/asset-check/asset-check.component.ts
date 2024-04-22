import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-check',
  templateUrl: './asset-check.component.html',
  styleUrls: ['./asset-check.component.css'],
})
export class AssetCheckComponent implements OnInit {
  imageExists = false;

  constructor() {}

  ngOnInit() {
    this.checkImageExistence('https://i.ibb.co/hVPyJ1q/assets.png');
  }

  checkImageExistence(imgUrl: string): void {
    const img = new Image();
    img.onload = () => {
      console.log('true');
      this.imageExists = true;
    };
    img.onerror = () => {
      console.log('false');
    };
  }
}
