import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-txn-fee',
  templateUrl: './txn-fee.page.html',
  styleUrls: ['./txn-fee.page.scss'],
})
export class TxnFeePage implements OnInit {
  feeList: any = [];
  activeTab = 'TXN_FEE';
  txnCurrency = 'LAK';
  constructor(
    private alertService: AlertService,
    private global: GlobalService,
    private rest: RestService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.fetchTxnFee();
  }
  pop() {
    this.navCtrl.pop();
  }
  async fetchTxnFee() {
    this.rest.fetchTxnFee().then(res => {
      console.log('TXN Fee: ' + JSON.stringify(res));
    }, err => {
      console.log('Error: ' + err);
    });
  }
}
