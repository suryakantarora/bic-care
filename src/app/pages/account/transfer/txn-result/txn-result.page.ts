import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-txn-result',
  templateUrl: './txn-result.page.html',
  styleUrls: ['./txn-result.page.scss'],
})
export class TxnResultPage implements OnInit {
  txnResult:any={};
  bgColor='#13A100';
  constructor(
    private navParam: NavParams
  ) {
    this.txnResult=this.navParam.get('txnData');
    console.log(this.txnResult);
    StatusBar.setBackgroundColor({ color: this.bgColor }).catch(err => {
      console.log('Status color will not work')
    });
  }

  ngOnInit() {
  }

}
