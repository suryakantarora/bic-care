import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@capacitor/device';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.page.html',
  styleUrls: ['./forgot-pin.page.scss'],
})
export class ForgotPinPage implements OnInit {
  isModalOpen = true;
  closeModal = false;

  genCaptchaText = '';
  current: any = 0;
  max: any = 100;
  radius = 100;
  formGroup: FormGroup = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    otp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
    otpRef: new FormControl('', Validators.required),
    captchaText: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });
  pinForm = new FormGroup({
    otpRef: new FormControl(''),
    newPin: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
    cnfPin: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
  });
  pageStatus = 1;
  errorMsg: string;
  deviceId: string;
  constructor(
    private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // this.global.setRoot('login');
    this.genCaptchaText = this.generateRandomText();
    this.f['otp'].clearValidators();
    this.f['otpRef'].clearValidators();
    this.setOpen(false);
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
  get pinMatched() {
    const newPin = this.pinForm.controls['newPin'].value;
    const cnfPin = this.pinForm.controls['cnfPin'].value;
    if (newPin && newPin === cnfPin) {
      this.errorMsg = '';
      return true;
    }
    if (cnfPin && newPin && cnfPin.length >= 6) {
      this.errorMsg = 'New PIN & Confirm PIN did not match';
    } else {
      this.errorMsg = '';
    }
    return false
  }
  get invalidCaptcha() {
    const captcha = this.formGroup.controls['captchaText'].value;
    if (this.genCaptchaText !== captcha) {
      return false;
    }
    return true;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  closeOtpModal() {
    this.closeModal = true;
    setTimeout(() => {
      this.setOpen(false);
    }, 100);
  }
  get f() { return this.formGroup.controls; }
  generateRandomText() {
    var resultKey = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var length = 5;
    for (var i = 0; i < length; i++) {
      resultKey += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return resultKey;
  }
  doSomethingWithCurrentValue(ev: any) {

  }
  getOverlayStyle() {
    const isSemi = false;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      fontSize: this.radius / 3.5 + 'px',
      color: '#fff'
    };
  }
  validateForm() {
    const mobile = this.formGroup.controls['mobileNumber'].value;
    const postData = {
      mobile: mobile,
      deviceId: this.deviceId
    };
    this.rest.forgotMpin(postData).then(res => {
      this.forgotMpinResp(res);
    }).catch(err => {
      console.error(err);
      this.rest.closeLoader();
    });
  }
  async forgotMpinResp(resp: any) {
    if (resp.RESP_STATUS === 'SUCCESS' && resp.otpFor === 'FMP' && resp.otpStatus === 'S') {
      this.current = 40;
      this.setOpen(true);
      this.f['otp'].addValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
      this.f['otpRef'].setValue(resp.otpRefId);
      this.pinForm.controls['otpRef'].setValue(resp.otpRefId);
      console.log('Otp Ref ID: ' + this.f['otpRef'].value);
    } else {
      this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
    }
  }
  validateOtp() {
    const otp = this.formGroup.controls['otp'].value;
    if(this.formGroup.invalid) {
      return;
    }
    const otpRefId = this.f['otpRef'].value;
    const postData = {
      otp: otp,
      otpRefId: otpRefId
    };
    this.rest.verifyOtp(postData).then(res => {
      this.validateOtpResp(res);
    }).catch(err => {
      console.error(err);
      this.rest.closeLoader();
    });
  }
  validateOtpResp(resp: any) {
    if (resp.RESP_STATUS === 'SUCCESS' && resp.otpStatus === 'V') {
      this.current = 80;
      this.closeOtpModal();
      this.pageStatus = 2;
    } else {
      this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
    }
  }
  validateNewPin() {
    const otpRefId = this.f['otpRef'].value;
    const pin = this.pinForm.controls['newPin'].value || '';
    if(!pin) {
      console.log('Invalid PIN');
      return;
    }
    const postData = {
      otpRefId: otpRefId,
      mpin: this.global.getHashData(pin),
      deviceId: this.deviceId
    };
    this.rest.resetMpin(postData).then(res => {
      this.setNewPinResp(res);
    }).catch(err => {
      console.error(err);
      this.rest.closeLoader();
    });
  }
  setNewPinResp(resp:any) {
    if (resp.RESP_STATUS === 'SUCCESS' && resp.status==='S') {
      this.pageStatus = 3;
      this.current = 100;
    } else {
      this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
    }
  }
  login() {
    this.navCtrl.pop();
  }
}
