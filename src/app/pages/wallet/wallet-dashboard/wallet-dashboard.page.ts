import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { KycStatusPage } from '../kyc/kyc-status/kyc-status.page';
import { suburl } from '../../../services/rest/url-config';
import { AppLauncher, OpenURLOptions } from '@capacitor/app-launcher';
@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.page.html',
  styleUrls: ['./wallet-dashboard.page.scss'],
})
export class WalletDashboardPage implements OnInit {
  profilePic = 'assets/imgs/home/man-icon-256x256.png';
  constructor(
    private translate: TranslateService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private storage: Storage,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private global: GlobalService,
    private rest: RestService
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.menu.enable(true);
    this.getProfilePic();
  }
  get profilePicture() {
    return this.profilePic;
  }
  ionViewWillLeave() {
    // this.menu.enable(false);
  }
  ionViewWillEnter() {
    // this.menu.enable(true);
  }
  getProfilePic() {
    this.storage.get('profilePic').then(res => {
      console.log('Profile Pic: ' + res);
      if (res) {
        this.profilePic = res;
      } else {
        this.profilePic = 'assets/imgs/home/man-icon-256x256.png';
      }
    })
  }
  async showConfirmLogout() {
    const header = this.translate.instant('ALERT');
    const msg = this.translate.instant('LOGOUT_MSG');
    const alert = await this.alertService.showConfirmAlert(header, msg);
    await alert.present();
    await alert.onDidDismiss().then(res => {
      if (res.data && res.data === 'Y') {
        this.navCtrl.navigateRoot(['/login'])
      }
    })
  }
  closeWalletPage() {
    this.navCtrl.pop();
  }
  openPage(page: string) {
    this.global.push(page);
  }
  openTransferPage(page:string) {
    if(page==='W2W') {
      this.global.transferTo='W2W';
    } else if (page === 'W2A') {
      this.global.transferTo='W2A';
    } else if (page === 'A2W') {
      this.global.transferTo='A2W';
    }
    this.openPage('wallet-transfer');
  }
  async openKycStatus() {
    const modal = await this.modalCtrl.create({
      component: KycStatusPage,
      initialBreakpoint: 0.6,
      breakpoints: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
      backdropDismiss: false,
      showBackdrop: true,
      handle: true,
      cssClass: 'kyc-status',
      mode: 'ios'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data !== 'NA') {
      this.openWhatsapp(data);
    }
  }
  async openWhatsapp(data: string) {
    console.log('URL: ' + suburl.WHATSAPP_URL + data + '&text=Hi');
    const urlOption: OpenURLOptions = {
      url: suburl.WHATSAPP_URL + data + '&text=Hi', 
    }
    await AppLauncher.openUrl(urlOption).then(res => {
      console.log(res);
    }).catch(err  => {
      console.error(err);
    });
  }
}
