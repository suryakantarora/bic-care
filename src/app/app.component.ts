import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';
import { register } from 'swiper/element/bundle';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Storage } from '@ionic/storage-angular';
import { MenuController, NavController } from '@ionic/angular';
import { GlobalService } from './services/global/global.service';
import { AlertService } from './services/alert/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  profilePic = 'assets/imgs/bic-logo.png';
  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    private storage: Storage,
    private navCtrl: NavController,
    private global: GlobalService,
    private alertService: AlertService,
    private menuCtrl: MenuController
  ) {
    this.storage.create();
    // this.storageService.initStorage();
    register(); // for swiper
    StatusBar.setBackgroundColor({ color: '#2E368D' }).catch(err => {
      console.log('Status bar will not work')
    });
    this.initializeApp();

  }
  async initializeApp() {
    const lang = await this.storageService.getData('lang');
    console.log('default lang: ' + lang);
    if (!lang) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.storageService.setData('lang', 'en');
    } else {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
    }
    this.readProfilePic();
  }
  readProfilePic() {
    this.storage.get('profilePic').then(res => {
      console.log('Profile Pic: ' + res);
      if (res) {
        this.profilePic = res;
      } else {
        this.profilePic = 'assets/imgs/bic-logo.png';
      }
    })
  }
  openPage(page: string) {
    this.menuCtrl.close().then(() => {
      this.storage.get('kycStatus').then((kycStatus) => {
        console.log('kycStatus : ' + kycStatus);
        if (kycStatus == 'S') {
          this.global.push(page);
        } else if (kycStatus == 'N') {
          // this.alertService.showAlert('ALERT', 'ALERT_EKYC_WAIT');
          this.global.push(page);
        }
      });
    });
  }

  checkKycStatus() {
    this.menuCtrl.close().then(() => {
      this.storage.get('kycStatus').then((kycStatus) => {
        console.log('kycStatus : ' + kycStatus);
        if (kycStatus == 'S') {
          this.alertService.showAlert(this.translate.instant("ALERT"), this.translate.instant("EKYC_APPROVED"));
        } else if (kycStatus == 'N') {
          this.storage.get('kycId').then((kycId) => {
            if (kycId) {
              this.alertService.showAlert('Ref ID: ' + kycId, 'ALERT_EKYC_WAIT');
            } else {
              this.alertService.showAlert('ALERT', 'ALERT_EKYC_WAIT');
            }
          }).catch(() => {
            this.alertService.showAlert('ALERT', 'ALERT_EKYC_WAIT');
          });
        } else if (kycStatus == 'R') {
          // this.showAlert('Ref ID '+this.ekycid,this.translate.instant("ALERT_EKYC_REJECTED"));
          this.navCtrl.navigateForward(['/update-kyc'])
        } else {
          this.navCtrl.navigateForward(['/update-kyc'])
        }
      });
    });
  }
}
