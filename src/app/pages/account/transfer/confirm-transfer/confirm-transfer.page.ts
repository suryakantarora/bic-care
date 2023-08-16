import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.page.html',
  styleUrls: ['./confirm-transfer.page.scss'],
})
export class ConfirmTransferPage implements OnInit {
  cnfData: any = {
  };
  txnDate: string=new Date().toISOString();
  constructor(
    public global: GlobalService,
    private navParams: NavParams
  ) {
    this.cnfData= this.navParams.data;
  }

  ngOnInit() {
  }
  closeModal(data: any) {
    this.global.modalCtrl.dismiss(data);
  }
  get toBankLogo() {
    const toBankId=this.cnfData.toBankId || 'BIC';
    if(toBankId==='BCEL') {
      return 'assets/imgs/bank-logo/27710418.png';
    } else if (toBankId==='LAPNET') {
      return 'assets/imgs/lapnet-sm.png';
    } else if (toBankId==='UMONEY') {
      return 'assets/imgs/umoney.jpg';
    } else if (toBankId==='MMONEY') {
      return 'assets/imgs/lmmdummy.png';
    }
    return 'assets/imgs/bic-logo.png';
  }
}
