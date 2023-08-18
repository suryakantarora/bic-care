import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
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
  profilePic = 'assets/imgs/home/man-icon-256x256.png';
  pageStatus = 1;
  enterAmount = 'N';
  amount: any;
  selectedCurrency = 'LAK';
  accList: any = []; /* [{ "accountPriority": "1", "accountType": "10", "accountCCY": "418", "accountState": "P", "accountNo": "000030200181803" },
  { "accountPriority": "2", "accountType": "10", "accountCCY": "840", "accountState": "S", "accountNo": "000010200667601" }]; */
  qrForm = new FormGroup({
    enterAmount: new FormControl('N'),
    amount: new FormControl(''),
    fromAccount: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
    askEnterAmount: new FormControl(false),
  })
  userDetail: any = {};
  deviceId: any;
  qrCodeString = '';
  fromAccDetail: any = {}; // { "accountPriority": "1", "accountType": "10", "accountCCY": "418", "accountState": "P", "accountNo": "000030200181803" };
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
    this.userDetail.userName = '';
    this.getUserInfo();
    this.getDeviceId();

  }
  get accType() {
    return this.global.getAccType(this.fromAccDetail.accountType);
  }
  maskAcc(acc: string) {
    return this.global.maskedAccountNumber(acc);
  }
  getCurrency(accountCCY: string) {
    return this.global.getTextCurrency(accountCCY);
  }
  onSelectEnterAmount(ev: any) {
    console.log('Enter Amount: ' + ev);
    if (ev === true) {
      this.qrForm.controls.enterAmount.setValue('Y');
      this.qrForm.controls.amount.addValidators(Validators.required);
    } else {
      this.qrForm.controls.enterAmount.setValue('N');
      this.qrForm.controls.amount.setValue('');
      this.qrForm.controls.amount.removeValidators(Validators.required);
      this.qrForm.controls.amount.clearValidators();
      this.qrForm.controls.amount.setErrors(null);
    }
  }
  get showEnterAmountField() {
    if (this.qrForm.controls.enterAmount.value === 'Y') {
      return true;
    }
    return false;
  }
  getProfilePic() {
    this.storage.get('profilePic').then(res => {
      if (res) this.profilePic = res;
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
    if (this.qrForm.valid) {
      this.pageStatus = 2;
      this.generateAccQr();
    }
  }
  currencyText(cur: string) {
    return this.global.getTextCurrency(cur);
  }

  getUserInfo() {
    const resp = this.rest.completeUserInfo;
    this.userDetail = resp;
    this.getLinkedAccountNum();
  }

  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.global.getDefaultAccNumber(this.accList).then(res => {
          this.fromAccDetail = res;
          this.qrForm.controls.fromAccount.setValue(res.accountNo);
          this.selectedCurrency = res.accountCCY;
          this.getPrimaryAcc();
        });
      } else {
        this.alertService.showAlert('ALERT', 'FAILED_LINKED_ACC');
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  getPrimaryAcc() {
    this.global.getPrimaryAccount(this.accList).then((res: any) => {
      this.qrForm.controls.fromAccount.setValue(res.accountNo);
    });
  }
  async selectFromAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if (!res) return;
      console.log(JSON.stringify(res));
      this.qrForm.controls.fromAccount.setValue(res.accountNo);
      this.selectedCurrency = res.accountCCY;
      this.fromAccDetail = res;
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
    this.rest.generateQr(postData).then(resp => {
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
    }).catch(er => {
      this.rest.closeLoader();
    });
  }
  generateQRCode(qrString: string) {
    this.pageStatus = 2;
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
