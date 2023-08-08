import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { VerifyOtpPage } from 'src/app/shared/modals/verify-otp/verify-otp.page';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.page.html',
  styleUrls: ['./link-card.page.scss'],
})
export class LinkCardPage implements OnInit {
  cardNumber: any;
  validity: string = 'MM/DD';
  cvv: string;
  cardHolderName: string = 'Card Holder Name';
  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  cardDetails: any = {};
  otp: any;
  otpReference: string = '123';
  deviceId: any;
  constructor(
    private alertService: AlertService,
    private rest: RestService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    // this.showOtpScreen();
    this.getDeviceId();
  }

  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }
  initCardNumber() {
  }
  validateCard() {
    const cardNum = this.cardNumber.replaceAll(' ', '');
    if (!this.cardNumber) {
      this.alertService.showToast('EMPTY_CARDNUM');
      return;
    } else if (cardNum.length < 16) {
      this.alertService.showToast('CARD_NUM_ERROR_MSG');
      return;
    }
    console.log(cardNum);
    const postData = {
      cardNo: cardNum
    };
    this.rest.verifyCredentials(postData).then((res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS' && res.otpStatus === 'S') {
        this.cardDetails = res;
        this.showOtpScreen();
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    })).catch(() => {
      this.rest.closeLoader();
    });
  }
  async showOtpScreen() {
    console.log('Opening OTP Page');
    const modal = await this.global.modalCtrl.create({
      component: VerifyOtpPage,
      componentProps: { otpReference: this.otpReference },
      cssClass: 'action-sheet-modal',
      backdropDismiss: false,
      backdropBreakpoint: 0.1,
      showBackdrop: true,
      breakpoints: [0.5],
      initialBreakpoint: 0.4,
      handle: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('OTP: ' + data);
    this.otp = data;
    if (data) this.validateOtp(data, this.cardDetails);

  }
  validateOtp(otp: string, cardDetails: any) {
    const postData = {
      otpRefId: cardDetails.otpRefId,
      custName: cardDetails.custName,
      custId: cardDetails.custId,
      otpStatus: cardDetails.otpStatus,
      userId: cardDetails.userId,
      cardNo: cardDetails.cardNo,
      expDate: cardDetails.expDate,
      otpFor: cardDetails.otpFor,
      otp: otp,
      deviceId: this.deviceId
    };
    this.rest.verifyOtp(postData).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS' && res.otpStatus !== 'F') {
        this.global.modalCtrl.dismiss(true);
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }

}
