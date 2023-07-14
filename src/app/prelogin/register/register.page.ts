import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  readonly phoneMask: MaskitoOptions = {
    mask: ['+','8', '5', '6', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    overwriteMode: 'replace',
  };
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  activeStepper:number=1;
  regForm:FormGroup = new FormGroup({
    mobileNum: new FormControl('', Validators.compose([Validators.required, Validators.minLength(17), Validators.maxLength(17)])),
    otp: new FormControl('', Validators.compose([Validators.required, Validators.min(100000), Validators.max(999999)])),
  });
  timer=10;
  timerLabel:string | undefined;
  showTimer=false;
  otpReference='';
  constructor() {
  }

  ngOnInit() {
  }
  next() {
    this.activeStepper+=1;
  }
  get f() { return this.regForm.controls; }
  clickedStepper(ev:any) {
    console.log('stepper clicked: ' + ev);
  }
  validateForm(){
    console.log('Submitted');
    this.activeStepper=2;
  }
  getOTP() {
    this.showTimer=true;
    this.initTimer();
    this.activateTimer();
  }
  initTimer() {
    this.timer=10;
  }
  activateTimer() {
    if(this.timer> 0) {
      this.timer>9?(this.timerLabel='00:'+this.timer):(this.timerLabel='00:0'+this.timer);
      setTimeout(() => {
        this.timer-=1;
        this.activateTimer();
      }, 1000);
    } else {
      this.timerLabel=undefined;
      this.otpReference='123456';
    }
  }
}
