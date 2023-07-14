import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

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
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private global: GlobalService,
    private rest: RestService
  ) { }

  ngOnInit() {
  }
  get f() { return this.loginForm.controls; }
  back() {
    this.navCtrl.pop();
  }
}
