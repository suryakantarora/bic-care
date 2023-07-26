import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { NavController } from '@ionic/angular';
import { RestService } from '../services/rest/rest.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private navCtrl: NavController, private rest: RestService) {}
  ngOnInit(): void {
      
  }

  async getAppInfo() {
    App.getInfo().then(res => {
      console.log('App Info: ' + JSON.stringify(res));
      this.rest.setData('appInfo', res);
      this.getDeviceInfo(res);
    });
  }
  async getDeviceInfo(appInfo:any) {
    await Device.getInfo().then((res) => {
      console.log('Device Info: ' + JSON.stringify(res));
      this.rest.setData('deviceInfo', res);
    }).catch((err) => {
      console.error(err)
    });
  }
  async getDeviceId() {
    const appDetail:any={};
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.rest.setData('deviceId', res.identifier);
    }).catch((err) => {
      console.error(err)
    });
  }
  ionViewDidEnter() {
    console.log('ionViewDidLoad HomePage');
    setTimeout(() => {
      this.navCtrl.navigateRoot(['home/welcome']);
    }, 3000);
  }
}
