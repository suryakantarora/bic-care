import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {
  walletDetail:any={};
  userDetail:any={};
  transferTo:string='W2W';
  accList=[];
  fromAccDetail:any={};
  exchangeRate:any=1;
  constructor(
    private alertService: AlertService,
    public global: GlobalService,
    private rest: RestService
  ) { 
    this.transferTo=this.global.transferTo || 'W2W';
  }

  ngOnInit() {
    this.initUserDetails();
  }

  initWalletDetails(event:any) {
    console.log('Wallet Details');
    console.log(event);
    this.walletDetail=event;
  }
  initUserDetails() {
    this.userDetail=this.rest.completeUserInfo;
  }
  sendAccList(event:any) {
    this.accList=event;
  }
  sendExchangeRate(event:any) {
    this.exchangeRate=event;
  }
  sendFromAccDetail(event:any) {
    this.fromAccDetail=event;
  }
}
