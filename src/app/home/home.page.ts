import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}
  ionViewDidEnter() {
    console.log('ionViewDidLoad HomePage');
    setTimeout(() => {
      this.navCtrl.navigateRoot(['home/welcome']);
    }, 3000);
  }
}
