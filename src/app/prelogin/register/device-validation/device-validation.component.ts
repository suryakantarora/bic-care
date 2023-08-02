import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Browser, OpenOptions } from '@capacitor/browser';
import { RestService } from 'src/app/services/rest/rest.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-device-validation',
  templateUrl: './device-validation.component.html',
  styleUrls: ['./device-validation.component.scss'],
})
export class DeviceValidationComponent implements OnInit {
  @Output() formValidated: EventEmitter<any> = new EventEmitter();
  isModalOpen = false;
  showMsg = false;
  validUser = true;
  closeModal = false;
  tcAccepted = false;
  activeStepper = 1;
  timer = 10;
  timerLabel: string | undefined;
  showTimer = false;
  otpReference = '';
  deviceId: string;
  deviceInfo: any;
  appInfo = {
    name: '', id: '', build: '', version: ''
  };
  custId: any;
  otpStatus: any;
  errMsg: string;
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '8', '5', '6', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    overwriteMode: 'replace',
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  regForm: FormGroup = new FormGroup({
    mobileNum: new FormControl('', Validators.compose([Validators.required, Validators.minLength(17), Validators.maxLength(17)])),
    otp: new FormControl('', Validators.compose([Validators.required, Validators.min(100000), Validators.max(999999)])),
  });
  emitData: any;
  constructor(
    private rest: RestService,
    private global: GlobalService,
    private alertService: AlertService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getAppInfo();
  }
  async getAppInfo() {
    App.getInfo().then(res => {
      console.log('App Info: ' + JSON.stringify(res));
      this.appInfo = res;
      this.getDeviceInfo(res);
    });
  }
  async getDeviceInfo(appInfo: any) {
    await Device.getInfo().then((res) => {
      console.log('Device Info: ' + JSON.stringify(res));
      this.deviceInfo = res;
      this.getDeviceId();
    }).catch((err) => {
      console.error(err)
    });
  }
  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }
  get f() { return this.regForm.controls; }
  validateNumber() {
    if (this.regForm.controls['mobileNum'].invalid) {
      this.alertService.showToast('Please enter mobile number first');
    } else if (!this.otpReference) {
      this.alertService.showToast('Please click on Get OTP');
    }
  }
  validateForm() {
    console.log('Submitted');
    // this.activeStepper = 2;
    if (this.activeStepper === 1 && !this.otpReference) {
      console.log('Sending validate mobile request');
      this.getOTP();
    } else if (this.activeStepper === 1 && this.otpReference) {
      console.log('Sending validate otp request');
      this.verifyOtp();
    }
  }
  resendOtp() {
   this.getOTP();
  }
  getOTP() {
    this.showTimer = true;
    this.initTimer();
    this.activateTimer();
    this.validateMobileApi();
  }
  next() {
    // this.activeStepper+=1;
    if (this.activeStepper === 1) {
      this.getOTP();
    }
  }
  initTimer() {
    this.timer = 30;
  }
  activateTimer() {
    if (this.timer > 0) {
      this.timer > 9 ? (this.timerLabel = '00:' + this.timer) : (this.timerLabel = '00:0' + this.timer);
      setTimeout(() => {
        this.timer -= 1;
        this.activateTimer();
      }, 1000);
    } else {
      this.timerLabel = undefined;
      // this.otpReference = '123456';
    }
  }
  async validateMobileApi() {
    const mobileNum = this.global.getMobileNum(this.regForm.controls['mobileNum'].value);
    const postData = {
      mobileNo: mobileNum,
      deviceId: this.deviceId,
      deviceModel: this.deviceInfo.model,
      deviceVersion: this.deviceInfo.osVersion
    };
    this.emitData = postData;
    this.rest.validateMobile(postData).then(res => {
      if (res.RESP_STATUS === 'SUCCESS') {
        if (res.otpRefId) {
          this.otpReference = res.otpRefId;
          this.alertService.showToast('OTP has been sent to your mobile number: ' + this.regForm.controls['mobileNum'].value);
        }
      } else {
        console.log('Failed Resp: ' + res.RESP_STATUS);
        this.alertService.showAlert('ALERT', res?.REASON || res.RESP_CODE);
      }
    }).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  verifyOtp() {
    const postData = {
      otpRefId: this.otpReference,
      otp: this.regForm.controls['otp'].value,
      deviceId: this.deviceId,
      deviceModel: this.deviceInfo.model,
      deviceVersion: this.deviceInfo.osVersion,
      appVersion: this.appInfo.version,
      appPlatform: this.deviceInfo.platform
    };
    this.rest.verifyOtp(postData).then(resp => {
      if (resp.RESP_STATUS == 'SUCCESS' && resp.otpFor == 'MVR' && resp.otpStatus == 'V') {
        this.custId = resp?.custId;
        this.otpStatus = resp.otpStatus;

        const emitdata: any = postData;
        const mobileNum = this.global.getMobileNum(this.regForm.controls['mobileNum'].value);
        emitdata.mobileNo = mobileNum;
        emitdata.deviceId = this.deviceId;
        emitdata.deviceModel = this.deviceInfo.model;
        emitdata.deviceVersion = this.deviceInfo.osVersion;
        this.formValidated.emit(emitdata);
        
      } else if (resp.RESP_STATUS == 'SUCCESS' && resp.otpFor == 'MVR' && resp.otpStatus == 'F') {
        this.alertService.showFailedAlert("ALERT", "Invalid OTP, Please try again with correct OTP");
      } else if (resp.RESP_STATUS == 'SUCCESS' && resp.otpFor == 'EMV' && resp.otpStatus == 'V') {
        this.storage.set('startPage', '2');
        this.alertService.showSuccessAlert("WELCOME_BACK", "REG_SUC_MSG");
        this.global.setRoot('login');
      } else if (resp.RESP_STATUS == 'FAIL') {
        this.alertService.showFailedAlert("FAIL", resp?.REASON || resp?.RESP_CODE);
      } else {
        this.alertService.showFailedAlert("ALERT", 'SOMETHING_WENT_WRONG');
      }
    }).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }

}
