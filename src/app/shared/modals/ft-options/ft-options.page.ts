import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ft-options',
  templateUrl: './ft-options.page.html',
  styleUrls: ['./ft-options.page.scss'],
})
export class FtOptionsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  close(data:string) {
    this.modalCtrl.dismiss(data);
  }
}
