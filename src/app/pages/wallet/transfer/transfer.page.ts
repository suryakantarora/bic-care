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
  constructor(
    private alertService: AlertService,
    public global: GlobalService,
    private rest: RestService
  ) { 
    this.transferTo=this.global.transferTo || 'W2W';
  }

  ngOnInit() {
  }

  initWalletDetails(event:any) {
    console.log('Wallet Details');
    console.log(event);
    this.walletDetail=event;
  }
  initUserDetails(event:any) {
    console.log('User Details');
    console.log(event);
    this.userDetail=event;
  }
}
