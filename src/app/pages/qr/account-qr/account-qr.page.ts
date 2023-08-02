import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { CurrencyMaskDirective } from "../../../services/directives/currency-mask.directive";
import { AccountListPage } from 'src/app/shared/modals/account-list/account-list.page';
import { SocialShareService } from 'src/app/services/social-share/social-share.service';
import { Device } from '@capacitor/device';

import html2canvas from 'html2canvas';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-account-qr',
  templateUrl: './account-qr.page.html',
  styleUrls: ['./account-qr.page.scss'],
})
export class AccountQrPage implements OnInit {
  @ViewChild('qr_screen') screen: ElementRef;
  @ViewChild('qr_canvas') canvas: ElementRef;
  @ViewChild('qr_downloadLink') downloadLink: ElementRef;
  profilePic='assets/imgs/home/man-icon-256x256.png';
  pageStatus=1;
  enterAmount='N';
  amount:any;
  selectedCurrency='LAK';
  accList:any=[
    {"accountState":"P","accountCCY":"418","accountPriority":"1","accountNo":"000030200181803","accountType":"10"},
    {"accountState":"S","accountCCY":"764","accountPriority":"1","accountNo":"000030200181802","accountType":"10"},
    {"accountState":"S","accountCCY":"840","accountPriority":"1","accountNo":"000030200181801","accountType":"10"},
  ];
  qrForm = new FormGroup({
    enterAmount: new FormControl('N', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    fromAccount: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
  })
  userDetail: any={};
  deviceId: any;
  qrCodeString='';
  test:any;
  constructor(
    private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService,
    private socialService: SocialShareService,
    private storage: Storage
  ) { 
    this.storage.create();
  }

  ngOnInit() {
    this.getProfilePic();
    this.userDetail.userName='';
    // this.getUserInfo();
    this.getDeviceId();
    this.global.getPrimaryAccount(this.accList).then((res:any)=> {
      this.qrForm.controls.fromAccount.setValue(res.accountNo);
    });
    
  }
  get showEnterAmountField() {
    if(this.qrForm.controls.enterAmount.value === 'Y') {
      return true;
    }
    return false;
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
    }).catch((err) => {
      console.error(err)
    });
  }

  downloadImage() {

  }
  generateQR() {
    if(this.qrForm.valid) {
      this.pageStatus=2;
      this.generateAccQr();
    }
  }
  currencyText(cur:string) {
    return this.global.getTextCurrency(cur);
  }
  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp=>{
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
      } else {
        this.alertService.showAlert('ALERT', 'FAILED_LINKED_ACC');
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
  }
  async selectFromAccount(){
    await this.global.selectFromAccount(this.accList).then(data => {
      console.log(JSON.stringify(data));
      this.qrForm.controls.fromAccount.setValue(data.accountNo);
      this.selectedCurrency=data.accountCCY;
    });
  }
  getUserInfo() {
    this.rest.getUserInfo({}).then(resp=> {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.userDetail = resp;
        this.getLinkedAccountNum();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
  }
  generateAccQr() {
    const amount = this.qrForm.controls.amount.value;
    const postData = {
      deviceid: this.deviceId,
      amount: amount,
      accountnumber: this.qrForm.controls.fromAccount.value,
      accountcurrency: this.selectedCurrency,
      paymenttype: 'A',
      name: this.userDetail.userName,
      purpose: this.qrForm.controls.remarks.value
    };
    this.rest.generateQr(postData).then(resp=>{
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        if (resp.RESP_STATUS == 'SUCCESS') {
          const qrString = resp.QRINFO;
          this.qrCodeString = resp.QRINFO;
          this.generateQRCode(qrString);
        } else {
          this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
        }
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(er=>{
      this.rest.closeLoader();
    });
  }
  generateQRCode(qrString:string) {
    this.pageStatus=2;
  }

  downloadQrImage() {
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
