import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-wallet-qr',
  templateUrl: './wallet-qr.page.html',
  styleUrls: ['./wallet-qr.page.scss'],
})
export class WalletQrPage implements OnInit {
  deviceId: string;
  profilePic: string = 'assets/imgs/home/man-icon-256x256.png';
  qrString: string;
  userName: any;
  wallCur: any;
  walletMobileNo: string;
  constructor(
    private rest: RestService,
    private alertService: AlertService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getDeviceId();
    this.qrString = '';
  }
  get profilePicture() {
    return this.profilePic;
  }
  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
      this.getWalletInfo();
    }).catch((err) => {
      console.error(err)
    });
  }
  async getWalletInfo() {
    const postData = {
      deviceId: this.deviceId,
    };
    this.rest.walletInfo(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS === 'SUCCESS') {
        this.userName = res.custName;
        this.wallCur = res.walletCurrency;
        this.walletMobileNo = '+856 ' + res.mobileNo.substring(res.mobileNo.length - 10);
        const mob = res.mobileNo.substring(res.mobileNo.length - 10);
        this.getQrSting(mob);
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE)
      }
    }).catch(err => {
      this.rest.closePopover();
    });
  }
  async getQrSting(mob: string) {
    const postData = {
      paymenttype: 'W',
      accountcurrency: this.wallCur,
      deviceid: this.deviceId,
    };
    this.rest.generateQr(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS === 'SUCCESS') {
        this.qrString = res.QRINFO;
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE)
      }
    }).catch(err => {
      this.rest.closePopover();
    });
  }
}
