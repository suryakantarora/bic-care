import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private navCtrl:NavController,
    private storage: Storage
  ) { 
    this.storage.create();
    this.storage.set('app', 'created');
  }

  ngOnInit() {
    setTimeout(() => {
      this.navCtrl.navigateForward(['/login']);
    }, 3000);
  }

}
