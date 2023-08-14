import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { TxnResultPage } from '../txn-result/txn-result.page';
import { RecentComponent } from 'src/app/shared/modals/recent/recent.component';

@Component({
  selector: 'app-ft-bic-bic',
  templateUrl: './ft-bic-bic.page.html',
  styleUrls: ['./ft-bic-bic.page.scss'],
})
export class FtBicBicPage implements OnInit {
  @ViewChild('recentModal') recentModal: any;
  accList: any = [];
  recent: any = [];
  transferType = 'BIC';
  fromAccDetail: any = {};
  userDetail: any = {};
  selectedCurrency: any = '418';
  exchangeRate: any = 1;
  showRecent = true;
  isRecentOpen = true;
  dismissRecent = false;
  constructor(
    public global: GlobalService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillLeave() {
    console.log('Called ionViewWillLeave');
  }
  closeRecentModal(recentModal:any ) {
    this.dismissRecent = true;
    this.isRecentOpen = false;
    recentModal.dismiss();
    setTimeout(() =>{
      this.global.pop();
    }, 100);
  };
  sendAccList(event: any) {
    this.accList = event;
  }
  sendFromAccDetail(event: any) {
    this.fromAccDetail = event;
  }
  sendExchangeRate(event: any) {
    this.exchangeRate = event;
  }
  sendUserDetails(event: any) {
    this.userDetail = event;
  }
  initRecent(event: any) {
    this.recent = event;
  }
  openRecent() {
    this.showRecent = !this.showRecent;
  }
  async showRecentModal() {
    const modal= await this.global.modalCtrl.create({
      component: RecentComponent,
      componentProps: this.recent
    });
  }
  async showTxnDetail(txnData: any, modal: any) {
    if(txnData === 'EXIT') {
      this.closeRecentModal(modal);
      return;
    }
    modal.setCurrentBreakpoint(0.05);
    const result = await this.global.modalCtrl.create({
      component: TxnResultPage, 
      componentProps: { txnData },
      animated: true
    });
    await result.present();
    const { data } = await result.onDidDismiss();
    console.log('FT Result screen closed: ' + data);
  }
  repeatTxn(txnData: any, modal: any) {
    modal.setCurrentBreakpoint(0.05);
    // further code
  }

} 