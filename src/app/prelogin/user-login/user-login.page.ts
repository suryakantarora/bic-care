import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@capacitor/device';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  });
  deviceId: string;
  randomKey: string = '';


  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private global: GlobalService,
    public storage: StorageService,
    private rest: RestService
  ) { }

  ngOnInit() {
    this.getDeviceId();
    this.randomKey = this.global.generateRandomKey();
  }

  async getDeviceId() {
    await Device.getId().then(res => {
      console.log('Device ID: ' + JSON.stringify(res));
      this.deviceId=res.identifier;
    }).catch((err) => {
      console.error(err)
    });
  }

  get f() { return this.loginForm.controls; }
  back() {
    this.navCtrl.pop();
  }
  async showConfirmAlert() {
    const alert = await this.alertService.showConfirmAlert('ALERT', 'RESET_PSWD');
    alert.present();
    const {data} = await alert.onDidDismiss();
    if(data === 'Y') {
      this.navCtrl.navigateForward('/forgot-password');
    }
  }

  login(){
    const password = this.loginForm.get('password')?.value;
    const userName = this.loginForm.get('userName')?.value;
    const hashedPassword = this.global.getHashData(this.global.getHashData(password), this.randomKey);
    const data = {
      userName : userName,
      password : hashedPassword,
      deviceId : this.deviceId,
      loginType:'UP',
      loginKey:this.randomKey
    };
    console.log(data);
    this.rest.loginUser(data).then((resp)=>{
      if(resp.RESP_STATUS === 'SUCCESS'){
        this.rest.authToken = resp.TOKEN;
        this.storage.setData('walletid',resp.walletId);
        this.global.setRoot('tabs/dashboard');        
      } else {
        this.alertService.showFailedAlert('FAILED', resp.REASON || resp.RESP_CODE || 'SOMETHING_WENT_WRONG');
      }
    }).catch(err =>{
      this.rest.closeLoader();
    });
  }

  async forgotPswrd(){
    const alert = await this.alertService.showConfirmAlert('ALERT', 'RESET_PSWD');
    await alert.present();
    
    const {data} = await alert.onDidDismiss();
    console.log(data);
    if(data === 'Y'){
      this.navCtrl.navigateForward('forgot-password');
    }
  }
}
