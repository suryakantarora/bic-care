import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-bic-other',
  templateUrl: './bic-other.page.html',
  styleUrls: ['./bic-other.page.scss'],
})
export class BicOtherPage implements OnInit {
  transferType='BCEL';
  fromAccDetail: any={ };
  userDetail: any={};
  selectedCurrency: any='418';
  accList=[];
  accountBalance: any='0';
  feeAmount: string;
  exchangeRate: any=1;
  constructor(
    private global: GlobalService,
  ) {
    this.transferType=this.global.transferTo;
    console.log('this.transferType: ' + this.transferType);
    if(!this.transferType) {
      // this.transferType='BCEL';
      this.transferType='UMONEY';
    }
  }
  get transferDesc() {
    if (this.transferType === 'BCEL') {
      return 'BIC_TO_BCEL_TRANSFER';
    } else if (this.transferType === 'LAPNET') {
      return 'TRANSFER_THROUGH_LAPNET';
    } else if (this.transferType === 'UMONEY') {
      return 'BIC_TO_UMONEY_TRANSFER';
    } else if (this.transferType === 'MMONEY') {
      return 'BIC_TO_MMONEY_TRANSFER';
    }
    return 'TRANSFER_THROUGH_BCEL';
  }
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
