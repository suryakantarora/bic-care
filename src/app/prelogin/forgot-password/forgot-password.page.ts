import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest/rest.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { NavController } from '@ionic/angular';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor( private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.genCaptchaText = this.generateRandomText();
    this.getDeviceId();
  }

  // Variables
  current:any=0;
  max:any=100;
  genCaptchaText:string = '';
  deviceId:string;
  isModalOpen = false;
  closeModal = false;
  otpRefId : string;
  pageStatus : number = 1;
  radius : number = 100;

  forgotPwdForm : FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    captchaText: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
  });

  otpForm:FormGroup = new FormGroup({
    otp:new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)])
  });

  pswrdForm:FormGroup = new FormGroup({
    newPswrd: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    cnfNewPswrd:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  });


  // Methods
  setOpen(isOpen:boolean){
    this.isModalOpen = isOpen;
  }
  async getDeviceId() { 
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId = res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }

  doSomethingWithCurrentValue(ev:any){
  }

  get f() { return this.forgotPwdForm.controls; }

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

  get invalidCaptcha() {
    const captcha = this.forgotPwdForm.controls['captchaText'].value;
    console.log(captcha);
    if (this.genCaptchaText !== captcha) {
      console.log(this.genCaptchaText);
      return false;
    }
    return true;
  }


  validateForm() {
    const mobile = this.forgotPwdForm.controls['mobileNumber'].value;
    const uid = this.forgotPwdForm.controls['userName'].value;
    const deviceId = this.deviceId;
    let postData = {
      "userName": uid,
      "mobile": mobile,
      "deviceId": deviceId
    };   
    this.rest.forgotMpin(postData).then((resp)=> {
      this.validateResponse(resp);
    }).catch((error)=>{
      console.log(error);
      this.rest.closeLoader();
    });
  }

  validateResponse(resp:any){
    if((resp.RESP_STATUS === 'SUCCESS') && (resp.otpStatus === 'S')){
      this.current=40;
      this.isModalOpen=true;
      this.otpRefId = resp.otpRefId;
    } else {
      this.alertService.showFailedAlert('FAILED', resp.REASON || resp.RESP_CODE || 'SOMETHING_WENT_WRONG')
    }
  }

  verifyOtp(){
    const otpValue = this.otpForm.controls['otp'].value;
    let postData = {
      'otp':otpValue,
      'otpRefId': this.otpRefId
    };
    this.rest.verifyOtp(postData).then((resp)=>{
      if((resp.RESP_STATUS === 'SUCCESS')){
        this.closeModal = true;
        setTimeout(()=>{
          this.setOpen(false);
        },100);
        this.current = 80;
        this.pageStatus += 1;  
      }else {
        this.alertService.showFailedAlert('FAILED', resp.REASON || resp.RESP_CODE || 'SOMETHING_WENT_WRONG')
      }
    }).catch((error)=>{
      console.log(error);
      this.rest.closeLoader();
    })
  }

  get pswrdInValid(){
    if((this.pswrdForm.controls['newPswrd'].value) !== (this.pswrdForm.controls['cnfNewPswrd'].value)){
      return true;
    }else{
      return false;
    }
  }

  setPswrd(){
    const pswrd = this.pswrdForm.controls['cnfNewPswrd'].value;
    console.log('The Password is '+pswrd);
    const hashedPswrd = this.global.getHashData(pswrd);
    let postData = {
      otpRefId:this.otpRefId,
      password:hashedPswrd,
      deviceId:this.deviceId,
    };
    this.rest.resetPassword(postData).then((resp)=>{
      if(resp.RESP_STATUS === 'SUCCESS'){
        this.current=100;
      } else{
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_STATUS);
      }
    }).catch((error)=>{
      console.log(error);
      this.rest.closeLoader();
    })
  }

  login(){
    this.navCtrl.pop()
  }

}
