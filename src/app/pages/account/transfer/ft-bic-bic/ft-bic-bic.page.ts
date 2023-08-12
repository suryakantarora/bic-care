import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ft-bic-bic',
  templateUrl: './ft-bic-bic.page.html',
  styleUrls: ['./ft-bic-bic.page.scss'],
})
export class FtBicBicPage implements OnInit {
  accList: any=[];
  transferType='BIC';
  fromAccDetail: any={};
  userDetail: any={};
  selectedCurrency: any='418';
  exchangeRate: any=1;
  constructor(
  ) { }

  ngOnInit() {
  }

  sendAccList(event:any) {
    this.accList=event;
  }
  sendFromAccDetail(event:any) {
    this.fromAccDetail=event;
  }
  sendExchangeRate(event:any) {
    this.exchangeRate=event;
  }
  sendUserDetails(event:any) {
    this.userDetail=event;
  }
}
