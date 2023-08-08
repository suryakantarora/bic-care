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
}
