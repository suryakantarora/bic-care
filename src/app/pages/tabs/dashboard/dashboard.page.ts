import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { FtOptionsPage } from 'src/app/shared/modals/ft-options/ft-options.page';
import { QrOptionPage } from '../../qr/qr-option/qr-option.page';

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
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private loaderService: LoaderService,
    private global: GlobalService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
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
    if(!data) return;
    if(data === 'BICTOBIC') {
      this.openPage('ft-bic-bic');
    } else if(data === 'BICTOBCEL') {
      // this.openPage('ft-bic-bcel');
      this.global.transferTo='BCEL';
      this.openPage('bic-other');
    } else if(data === 'LAPNET') {
      // this.openPage('ft-bic-lapnet');
      this.global.transferTo='LAPNET';
      this.openPage('bic-other');
    } else if(data === 'UMONEY') {
      // this.openPage('ft-bic-umoney');
      this.global.transferTo='UMONEY';
      this.openPage('bic-other');
    } else if(data === 'MMONEY') {
      // this.openPage('ft-bic-mmoney');
      this.global.transferTo='MMONEY';
      this.openPage('bic-other');
    }
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
  async showOption(ev:Event) {
    const popover = await this.popoverCtrl.create({
      component: QrOptionPage,
      event: ev,
      mode: 'ios',
      cssClass: 'custom-popover'
    });
    await popover.present();
    const {data} = await popover.onDidDismiss();
    console.log(data);
    if(data && data==='W') {
      this.global.push('wallet-qr');
    } else if (data && data==='A') {
      this.global.push('account-qr');
    }
  }
}
