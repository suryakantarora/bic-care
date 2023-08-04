import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {
  accList:any=[];
  constructor(
    private navParams: NavParams,
    private global:GlobalService
  ) { 
    this.accList=this.navParams.data;
  }

  ngOnInit() {
  }
  getAccType(accType:string) {
    return this.global.getAccType(accType);
  }
  closModal(data:any) {
    this.global.modalCtrl.dismiss(data);
  }
  getCurrency(cur:string) {
    return this.global.getTextCurrency(cur);
  }
}
