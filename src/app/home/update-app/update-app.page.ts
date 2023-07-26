import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { RestService } from 'src/app/services/rest/rest.service';
import { Browser, OpenOptions } from '@capacitor/browser';
import { AppLauncher, OpenURLOptions } from '@capacitor/app-launcher';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.page.html',
  styleUrls: ['./update-app.page.scss'],
})
export class UpdateAppPage implements OnInit {
  featureList: any = [];
  updateDetails:any;//={"releaseDate":"2023-06-27 00:00:00.0","releaseVersion":"1.2.31","releaseType":"O","releaseDesc":"- Known Bugs Fixes","platform":"ANDROID"};
  appData: any;
  url: any;
  appInfo: any;
  deviceDetail: any;
  constructor(
    private navCtrl: NavController,
    private rest: RestService
  ) { }

  ngOnInit() {
    this.updateDetails=this.rest.getData();
    this.getDeviceDetail();
    App.getInfo().then(res => {
      console.log('App Info: ' +JSON.stringify(res));
      this.appInfo=res;
    })
  }
  async getDeviceDetail(){
    await Device.getInfo().then(res => {
      this.deviceDetail=res;
    });
  }
  async updateApp(data: string) {
    let url = '';
    if (data === 'SKIP') {
      this.navCtrl.navigateRoot(['/login']);
    } else {
      console.log('Proceed to open play/app store');
      if (this.deviceDetail?.platform === 'ios') {
        url = this.rest.appStoreUrl;
        console.log('IOS Platform detected, opening app store: ' + url);
      } else {
        url = this.rest.playStoreUrl;
        console.log('Androoid Platform detected, opening app store: ' + url);
      }
      
      const option: OpenOptions = {
        url: url, 
      }
      const urlOption: OpenURLOptions = {
        url: url, 
      }
      // await Browser.open(option);
      await AppLauncher.openUrl(urlOption).then(res => {
        console.log(res);
        this.navCtrl.navigateRoot(['/home']);
      }).catch(err  => {
        console.error(err);
      });
    }
  }
}
