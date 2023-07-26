import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Browser, OpenOptions } from '@capacitor/browser';
import { RestService } from 'src/app/services/rest/rest.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isModalOpen = true;
  showMsg = false;
  validUser = true;
  closeModal = false;
  tcAccepted = false;
  activeStepper = 2;
  deviceId: string;
  deviceInfo: any;
  appInfo: any;
  regData: any={};
  constructor(
    private rest: RestService,
    private global: GlobalService,
    private alertService: AlertService,
    private storage: Storage
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.setOpen(false);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  clickedStepper(ev: any) {
    console.log('stepper clicked: ' + ev);
    this.activeStepper = ev;
  }

  async continue(data: number) {
    if (data === 0) {
      // exit the app
      App.exitApp();
    } else {
      // continue disabling model
      this.closeModal = true;
      setTimeout(() => {
        this.setOpen(false);
      }, 100);
    }
  }
  async openTNC() {
    const option: OpenOptions = {
      url: this.rest.tcUrl,
      presentationStyle: 'fullscreen'
    }
    await Browser.open(option);
  }
  // device validation
  formValidated(ev: Event) {
    console.log('Device Validation: ' + JSON.stringify(ev));
    if (ev) {
      const data: any = ev;
      this.regData = data;
      this.activeStepper += 1;
    }
  }
  // Username and password form submit
  submitUserNameAndPassword(ev: any) {
    console.log('User Password Detail: ' + JSON.stringify(ev));
    const regData:any={};
    if (ev) {
      const data: any = ev;
      console.log('username: ' + data.userName);
      console.log('password: ' + data.password);
      this.regData.userName = data.userName;
      this.regData.password = data.password;
      this.activeStepper += 1;
    }
  }
  // User detail form submit
  submitUserDetail(ev: Event) {
    console.log('User Detail: ' + JSON.stringify(ev));
    if (ev) {
      this.activeStepper += 1;
    }
  }
  // mpin Form Submit
  submitMpin(ev: Event) {
    console.log('MPin Detail: ' + JSON.stringify(ev));
    if (ev) {
      // this.initRegistration();
    }
  }

  initRegistration(data: any) {
    const postData = {
      deviceId: this.deviceId,
      otpRefId: data.otpReference,
      deviceModel: data.deviceModel,
      deviceVersion: data.deviceVersion,
      appVersion: data.appVersion,
      appPlatform: data.appPlatform,
      mpin: this.hashedData(data.mpin),
      question1: '',
      question2: '',
      question3: '',
      answer1: '',
      answer2: '',
      answer3: '',
      email: data.email,
      name: data.userName,
      dateOfBirth: data.dob,
      maritalStatus: data.maritalStatus,
      fname: data.firstName,
      mname: data.middleName,
      lname: data.surname,
      nationality: data.nationality,
      fatherName: data.fatherName,
      gender: data.sex,
      address: data.address,
      mobile: data.mobile,
      userName: data.userName,
      password: this.hashedData(data.hashedPass)
    };
    console.log(JSON.stringify(postData));
  }


  hashedData(data: string) {
    let resp = this.global.getHashData(data);
    let respString = resp.toString();
    return respString;
  }
}
