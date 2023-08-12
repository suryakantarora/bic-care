import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { RestService } from 'src/app/services/rest/rest.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  deviceId: any;
  startPage: any;
  deviceDetail: any;
  appInfo: any;

  constructor(
    private navCtrl:NavController,
    private global: GlobalService,
    private storage: Storage,
    private rest: RestService
  ) {
    this.storage.create();
    this.storage.set('app', 'created');
  }

  ngOnInit() {
    this.clearPreviousToken();
    App.getInfo().then(res => {
      console.log('App Info: ' +JSON.stringify(res));
      this.appInfo=res;
      this.getDeviceDetail();
    });
    /* setTimeout(() => {
      this.navCtrl.navigateForward(['/login']);
    }, 3000); */

  }
  clearPreviousToken() {
		this.storage.set('TOKEN', null);
	}
  openPage(val:string) {
    console.log('StartPage Value : ' + val);
		if (val === '1' || val === '2') {
			this.deviceInfo(val);
		} else {
			this.navCtrl.navigateRoot('start');
		}
  }
  async getDeviceDetail() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
      this.storage.get('startPage').then((val) => {
        this.startPage=val;
        this.openPage(val);
      });
    }).catch((err) => {
      console.error(err)
    });
    await Device.getInfo().then(res => {
      this.deviceDetail=res;
    })
  }
  async deviceInfo(val:string) {
    const postData = {
      deviceId: this.deviceId,
    };
    this.rest.deviceInfoStartTime(postData).then(res => {
      this.deviceInfoResp(res, val);
    }).catch(err=> {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  async deviceInfoResp(resp:any, val:string) {
    if (resp.RESP_STATUS == 'SUCCESS' && resp.status === 'A' && val === '2') {
      // Device is already registered and active, Proceeed to check app update
			this.checkAppVersion();
		} else if (resp.RESP_STATUS == 'SUCCESS' && resp.status === 'A' && val === '1') {
      this.global.showToast('Register your device to continue using the app');
			this.global.setRoot('register');
		} else if (resp.RESP_STATUS === 'SUCCESS' && resp.status === 'IA') {
      this.global.showToast('Device is inactive, Please register again');
			this.global.setRoot('register');
		} else if (resp.RESP_STATUS === 'FAIL') {
      this.global.showToast(resp.REASON || resp.RESP_CODE);
			this.global.setRoot('register');
		} else {
			this.global.setRoot('error');
		}
  }
  async checkAppVersion() {
    const postData = {
      deviceId: this.deviceId,
    };
    this.rest.appRelease(postData).then(res => {
      this.appVersionResp(res, this.startPage);
    }).catch(err=> {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  appVersionResp(resp:any, startPage:string) {
		console.log('App Release Data: ' + JSON.stringify(resp));
		if (resp.RESP_STATUS == 'SUCCESS') {
      if(startPage === '2') {
        if (this.deviceDetail?.platform === 'ios') {
          console.log('Checking for ios platform');
          for (let data of resp.data) {
            console.log('Data : ' + JSON.stringify(data));
            if (data.platform === "IOS" || data.platform === "ios") {
              if(data.releaseVersion !== this.appInfo.version){
                // App update for ios code goes here
                this.openAppUpdatePage(data);
              }
            }
          }
        } else {
          console.log('Checking for android platform');
          for (let data of resp.data) {
            console.log('Data : ' + JSON.stringify(data));
            if (data.platform === "ANDROID" || data.platform === "android") {
              if (data.releaseVersion !== this.appInfo.version) {
                // app update for android code goes here
                this.openAppUpdatePage(data);
              }
            }
          }
        }
      } else {
        this.global.setRoot('login');
      }
		}
	}

  async openAppUpdatePage(data:any) {
    this.rest.setData(data);
    this.navCtrl.navigateRoot(['home/update-app'])
  }
}
