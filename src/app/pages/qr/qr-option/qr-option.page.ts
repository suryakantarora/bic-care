import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-qr-option',
  templateUrl: './qr-option.page.html',
  styleUrls: ['./qr-option.page.scss'],
})
export class QrOptionPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  close(data:string) {
    this.popoverCtrl.dismiss(data);
  }
}
