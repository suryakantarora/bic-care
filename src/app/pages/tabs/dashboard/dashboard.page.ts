import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { FtOptionsPage } from 'src/app/shared/modals/ft-options/ft-options.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  cols:any=[
    {img: 'assets/imgs/home/my-profile-512x512.png', label:'My Profile', class:"right bottom", page:'scan'},
    {img: 'assets/imgs/home/statement-512x512.png', label:'Statement', class:"right bottom", page:'scan'},
    {img: 'assets/imgs/home/card-info-512x512.png', label:'Manage Card', class:"bottom", page:'scan'},
    {img: 'assets/imgs/home/my-account-512x512.png', label:'My Account', class:"right bottom", page:'scan'},
    {img: 'assets/imgs/home/fund-transfer-512x512.png', label:'Fund Transfer', class:"right bottom", page:'scan'},
    {img: 'assets/imgs/home/bill-payments-512x512.png', label:'Bill Payments', class:"bottom", page:'scan'},
    {img: 'assets/imgs/home/scan&pay-512x512.png', label:'Best Pay', class:"right bottom", page:'scan-qr'},
    {img: 'assets/imgs/home/wallet-512x512.png', label:'Wallet', class:"right bottom", page:'scan'},
    {img: 'assets/imgs/home/recharge-512x512.png', label:'Mobile Topup', class:"bottom", page:'scan'},
    {img: 'assets/imgs/home/offers-512x512.png', label:'Offers', class:"right", page:'scan'},
    {img: 'assets/imgs/home/fav_benf.png', label:'Manage Favorite', class:"right", page:'scan'},
    {img: 'assets/imgs/home/quick-pay-512x512.png', label:'Quick Pay', page:'scan'},
  ];
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loaderService.stop();
    this.global.deviceInfo().then(res => {
      console.log(res);
    }).catch(err=> {
      console.error(err);
    });
  }
  async showFundTransferOption() {
    const modal= await this.modalCtrl.create({
      component: FtOptionsPage,
      componentProps: {type: 'ACC_FT'},
      initialBreakpoint: 0.6,
      breakpoints: [0.1,0.2,0.3,0.4,0.5,0.6,0.7],
      backdropBreakpoint: 0.1,
      showBackdrop: true,
      handleBehavior: 'none',
      handle: false
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log('data returned: ' + data);
  }
  openPage(page:string) {
    console.log('Opening Page: ' + page);
    this.navCtrl.navigateForward(page).then(() => {
      console.log('Page opened: ' + page);
    }).catch((err) =>{
      console.log('Page Error: ' + err);
      this.alertService.showToast('Page not found');
    });
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
