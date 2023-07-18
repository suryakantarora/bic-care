import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.page.html',
  styleUrls: ['./wallet-dashboard.page.scss'],
})
export class WalletDashboardPage implements OnInit {
  profilePic='assets/imgs/home/man-icon-256x256.png';
  constructor(
    private translate: TranslateService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.storage.create();}

  ngOnInit() {
    this.getProfilePic();
  }
  getProfilePic() {
    this.storage.get('profilePic').then(res => {
      console.log('Profile Pic: ' + res);
      if(res) {
        this.profilePic=res;
      } else {
        this.profilePic='assets/imgs/home/man-icon-256x256.png';
      }
    })
  }
  async showConfirmLogout(){
    const header= this.translate.instant('ALERT');
    const msg= this.translate.instant('LOGOUT_MSG');
    const alert= await this.alertService.showConfirmAlert(header, msg);
    await alert.present();
    await alert.onDidDismiss().then(res => {
      if(res.data && res.data==='Y') {
        this.navCtrl.navigateRoot(['/login'])
      }
    })
  }

}
