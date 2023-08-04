import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SocialShareService } from 'src/app/services/social-share/social-share.service';
import { Device } from '@capacitor/device';
import html2canvas from 'html2canvas';
import { Storage } from '@ionic/storage-angular';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wallet-qr',
  templateUrl: './wallet-qr.page.html',
  styleUrls: ['./wallet-qr.page.scss'],
})
export class WalletQrPage implements OnInit {
  @ViewChild('qr_screen') screen: ElementRef;
  @ViewChild('qr_canvas') canvas: ElementRef;
  @ViewChild('qr_downloadLink') downloadLink: ElementRef;
  deviceId: string;
  profilePic: string = 'assets/imgs/home/man-icon-256x256.png';
  qrString: string;
  userName: string;
  wallCur: string;
  walletMobileNo: string;
  testForm = new FormGroup({
    test: new FormControl('')
  });
  constructor(
    private rest: RestService,
    private alertService: AlertService,
    private global: GlobalService,
    private socialService: SocialShareService,
    private storage: Storage
  ) { 
    this.storage.create();
  }

  ngOnInit() {
    this.getDeviceId();
    this.getProfilePic();
    this.qrString = ''; // 'Hello my friend this is the TEST QR, You can scan it pay in my wallet id';
  }
  getProfilePic() {
    this.storage.get('profilePic').then(res => {
      if (res) this.profilePic=res;
    });
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
      this.rest.closeLoader();
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
      this.rest.closeLoader();
    });
  }

  downloadImage() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      // this.downloadLink.nativeElement.click();
      /* console.log('QR Base64: ' + this.canvas.nativeElement.src);
      console.log('this.downloadLink.nativeElement.href: ' + this.downloadLink.nativeElement.href); */
      console.log('this.downloadLink.nativeElement.download: ' + this.downloadLink.nativeElement);
      this.socialService.shareFile(this.canvas.nativeElement.src, 'BIC_QR.png');
    });
  }
  
}
