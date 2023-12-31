import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {
  formGroup: FormGroup = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
  });
  otpRefId: any;
  deviceInfo: any;
  appInfo = {
    name: '', id: '', build: '', version: ''
  };
  deviceId: string;
  constructor(
    private modalCtrl: ModalController,
    private rest: RestService,
    private alertService: AlertService,
    private navParams: NavParams,
    private global: GlobalService
  ) {
    this.otpRefId= this.navParams.get('otpReference');
    console.log('this.otpRefId: ' + this.otpRefId);
  }

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

  close(data:any) {
    this.modalCtrl.dismiss(data);
  }
  sendOtp() {
    const otp = this.formGroup.controls['otp'].value;
    this.close(otp);
  }
  validateOtp() {
    const otp = this.formGroup.controls['otp'].value;
    if(this.formGroup.invalid) {
      return;
    }
    const postData = {
      otp: otp,
      otpRefId: this.otpRefId,
      deviceId: this.deviceId,
      deviceModel: this.deviceInfo.model,
      deviceVersion: this.deviceInfo.osVersion,
      appVersion: this.appInfo.version,
      appPlatform: this.deviceInfo.platform
    };
    this.rest.verifyOtp(postData).then(res => {
      this.validateOtpResp(res);
    }).catch(err => {
      console.error(err);
      this.rest.closeLoader();
    });
  }
  validateOtpResp(resp: any) {
    if (resp.RESP_CODE === 'MPAY1019') {
      this.global.timeout();
    } else if (resp.RESP_STATUS === 'SUCCESS' && resp.otpStatus === 'V') {
      this.close(resp);
    } else {
      this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
    }
  }
}
