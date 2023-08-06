import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-ft-bic-bic',
  templateUrl: './ft-bic-bic.page.html',
  styleUrls: ['./ft-bic-bic.page.scss'],
})
export class FtBicBicPage implements OnInit {
  accList: any=[];
  fromAccDetail: any={};
  userDetail: any={};
  selectedCurrency: any;
  ftForm:FormGroup = new FormGroup({
    fromAccount: new FormControl(''),
    txnAmount: new FormControl('')
  });
  accountBalance: number;
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
          this.ftForm.controls['fromAccount'].setValue(res.accountNo);
          this.selectedCurrency = res.accountCCY;
          this.getPrimaryAcc();
          this.getAccountBalance(res.accountNo);
        });
      } else {
        this.alertService.showAlert('ALERT', 'FAILED_LINKED_ACC');
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  getPrimaryAcc() {
    this.global.getPrimaryAccount(this.accList).then((res: any) => {
    
    });
  }
  async selectFromAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if(!res) return;
      console.log(JSON.stringify(res));
      this.ftForm.controls['fromAccount'].setValue(res.accountNo);
      this.selectedCurrency = res.accountCCY;
      this.fromAccDetail=res;
      this.getAccountBalance(res.accountNo);
    });
  }
  getAccountBalance(accNum: any) {
		this.accountBalance = 0;
    this.rest.getAccountBalance(accNum).then(res => {
      if (res.RESP_STATUS == 'SUCCESS') {
        this.accountBalance = res.BALANCE;
        /* this.txnCurrency = res.CURRENCY;
        this.sourceCurrency = res.CURRENCY;
        this.fromAccDetail = res.ACCOUNT;
        this.exchangerate();
        this.fundTransferType = null; */
      }
      else {
        this.accountBalance = 0;
        this.alertService.showAlert('ALERT', 'SOMETHING_WENT_WRONG');
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
	}
  exchangerate() {

  }
}
