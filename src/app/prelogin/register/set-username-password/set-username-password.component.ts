import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Browser, OpenOptions } from '@capacitor/browser';
import { RestService } from 'src/app/services/rest/rest.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-set-username-password',
  templateUrl: './set-username-password.component.html',
  styleUrls: ['./set-username-password.component.scss'],
})
export class SetUsernamePasswordComponent  implements OnInit {
  @Output() sendUserNamePassword:EventEmitter<any> = new EventEmitter();
  isModalOpen = false;
  showMsg = false;
  validUser = false;
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.min(8), Validators.max(20)])),
    cnfPassword: new FormControl('', Validators.compose([Validators.required, Validators.min(8), Validators.max(20)])),
  });
  timer = 30;
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
  constructor(
    private rest: RestService,
    private global: GlobalService,
    private alertService: AlertService,
    private storage: Storage
    ) { }

  ngOnInit() {
    const deviceDetail= this.rest.getDeviceDetail();
    console.log(JSON.stringify(deviceDetail))
  }

  // username and password validation
  validPass(pass: string) {
    if (!pass) {
      return false;
    }
    return true;
  }
  get validPassword() {
    const pass = this.userForm.controls['password'].value;
    const cnfPass = this.userForm.controls['cnfPassword'].value;
    if (pass === cnfPass && this.validPass(pass)) {
      return true;
    }
    return false;
  }
  clearMsg() {
    this.showMsg=false;
    this.errMsg='';
  }
  checkUserName() {
    console.log('User Name : ' + this.userForm.controls['username'].value);
    let uname = this.userForm.controls['username'].value.replace(/\s/g, '');
    this.userForm.controls['username'].setValue(uname);
    if (this.checkFirst(uname.substring(0, 1)) == false) {
      this.errMsg = "FIRST_LTR_CHR_MSG";//'First letter must be character';
      this.alertService.showToast(this.errMsg);
      this.validUser = false;
    } else if (this.checkSpecialChar(uname) == true) {
      this.errMsg = "SPCL_CHR_NT_ALWD";//'Special Characters and blank spaces are not allowed';
      this.alertService.showToast(this.errMsg);
      // this.userForm.controls['username'].setValue('');
      this.validUser = false;
    } else {
      this.sendCheckUserNameRequest();
    }
  }
  sendCheckUserNameRequest() {
    let postData = {
      userName: this.userForm.controls['username'].value
    };
    this.rest.checkUserName(postData).then(res => this.userNameResp(res)).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  userNameResp(resp: any) {
    this.errMsg = '';
    this.showMsg=true;
    console.log(JSON.stringify(resp));
    if (resp.RESP_STATUS == 'SUCCESS' && resp.status == 'INVALID') {
      this.validUser = false;
    } else if (resp.RESP_STATUS == 'SUCCESS' && resp.status == 'VALID') {
      this.validUser = true;
    }
  }
  checkFirst(data: string) {
    return data.match(/^[^a-zA-Z]+$/) ? false : true;
  }
  checkSpecialChar(data: string) {
    return data.match(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/) ? false : true;
  }
  async validatePassword() {
    console.log('Password validation');
    if(this.validUser) {
      console.log('Valid user')
      const emitData={
        userName: this.userForm.controls['username'].value,
        password: this.userForm.controls['password'].value,
      };
      this.sendUserNamePassword.emit(emitData);
    } else {
      this.showMsg=true;
      this.validUser = false;
      console.log('Invalid user');
    }
  }
}
