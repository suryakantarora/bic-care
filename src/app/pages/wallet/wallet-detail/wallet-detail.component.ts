import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Device } from '@capacitor/device';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.scss'],
})
export class WalletDetailComponent  implements OnInit {
  @Output() sendUserDetail: EventEmitter<any> = new EventEmitter();
  @Output() sendWalletDetail: EventEmitter<any> = new EventEmitter();
  walletBalance:any=10000;
  userDetail: any={ };
  walletDetail: any={"walletBalance":"10000","walletCurrency":"418","mobileNo":"2087654321","custName":"SKSINGH","deviceId":"78f8fdf2fa05f877"};
  deviceId: any;
  walletMobileNo: string='2052592794';
  walletCurrency: any='LAK';
  userName: any='Suryakant Kumar';
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getDeviceId();
    // this.rest.getUserInfo({});
  }
  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
      this.walletInfo();
    }).catch((err) => {
      console.error(err)
    });
  }
  walletInfo() {
    const postData = {
      deviceId: this.deviceId,
    };
    this.rest.walletInfo(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS === 'SUCCESS') {
        this.sendWalletDetail.emit(res);
        this.userName = res.custName;
        this.walletCurrency = res.walletCurrency;
        this.walletBalance = res.walletBalance;
        this.walletMobileNo = res.mobileNo.substring(res.mobileNo.length - 10);
        const mob = res.mobileNo.substring(res.mobileNo.length - 10);
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE)
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
}
