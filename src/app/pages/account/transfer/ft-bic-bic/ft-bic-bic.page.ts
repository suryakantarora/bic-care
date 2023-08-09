import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { OwnAccTransferComponent } from './own-acc-transfer/own-acc-transfer.component';
import { BicAccTransferComponent } from './bic-acc-transfer/bic-acc-transfer.component';

@Component({
  selector: 'app-ft-bic-bic',
  templateUrl: './ft-bic-bic.page.html',
  styleUrls: ['./ft-bic-bic.page.scss'],
})
export class FtBicBicPage implements OnInit {
  @ViewChild(OwnAccTransferComponent, { static: false }) ownAccTransfer: OwnAccTransferComponent;
  @ViewChild(BicAccTransferComponent, { static: false }) bicAccTransfer: BicAccTransferComponent;
  accList: any=[{"accountState":"P","accountCCY":"418","accountPriority":"1","accountNo":"000010200667601","accountType":"10"},
  {"accountState":"S","accountCCY":"418","accountPriority":"2","accountNo":"000030200181803","accountType":"10"}];
  transferType='BIC';
  fromAccDetail: any={
    accountType: '10', 
    accountCCY:'418',
    accountNo:'000010200667601'
  };
  userDetail: any={};
  selectedCurrency: any='418';
  
  accountBalance: any='123331323.99';
  feeAmount: string;
  exchangeRate: any=1;
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService,
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  get accType() {
    return this.global.getAccType(this.fromAccDetail.accountType);
  }
  maskAcc(acc: string) {
    return this.global.maskedAccountNumber(acc);
  }
  getCurrency(accountCCY:string) {
    return this.global.getTextCurrency(accountCCY);
  }
  maskBalance(accountBalance:any) {
    return this.global.formatAmmount(accountBalance);
  }
  getUserInfo() {
    this.rest.getUserInfo({}).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.userDetail = resp;
        this.getLinkedAccountNum();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }

  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.global.getDefaultAccNumber(this.accList).then(res => {
          this.fromAccDetail = res;
          this.selectedCurrency = res.accountCCY;
          this.getAccountBalance(res.accountNo);
        });
      } else {
        this.alertService.showAlert('ALERT',  resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  async selectFromAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.selectedCurrency = res.accountCCY;
      this.fromAccDetail=res;
      this.getAccountBalance(res.accountNo);
    });
  }
  
  getAccountBalance(accNum: any) {
		this.accountBalance = 0;
    this.rest.getAccountBalance(accNum).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.exchangerate();
        this.accountBalance = res.BALANCE;
        /* this.txnCurrency = res.CURRENCY;
        this.sourceCurrency = res.CURRENCY;
        this.fromAccDetail = res.ACCOUNT;
        this.fundTransferType = null; */
      }
      else {
        this.accountBalance = 0;
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
	}
  exchangerate() {
    this.rest.fetchExchangeRate().then(res => {
      if (res.RESP_STATUS == 'SUCCESS') {
        let data = res.data;
        for (let i of data) {
          if (this.global.getTextCurrency(i.currency) === this.global.getTextCurrency(this.fromAccDetail.accountCCY)) {
            this.exchangeRate = i.buyRate;
          }
        }
      } else {
        console.log('Failed to get exchange Rate');
        this.alertService.showToast('Failed to get exchange rate');
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(() => {
      this.rest.closeLoader();
    });
  }
  checkCrossCurrencyForOwnAccTransfer() {

  }

  // BIC to BIC other account transfer
  checkBenefType() {

  }
  get disabledOwnAccTransferBtn() {
    console.log('this.ownAccTransfer.formStatus: ' + this.ownAccTransfer.formStatus);
    if(this.ownAccTransfer.formStatus) {
      return true;
    }
    return false;
  }
}
