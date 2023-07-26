import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.page.html',
  styleUrls: ['./forgot-pin.page.scss'],
})
export class ForgotPinPage implements OnInit {
  genCaptchaText='';
  current: any = 0;
  max: any = 100;
  radius = 100;
  formGroup: FormGroup = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    otp: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    captchaText: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });
  pinForm = new FormGroup({
    otpRef: new FormControl('', Validators.required),
    newPin: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    cnfPin: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  constructor(
    private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.genCaptchaText=this.generateRandomText();
  }
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

  }
}
