import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-acc-statement',
  templateUrl: './acc-statement.page.html',
  styleUrls: ['./acc-statement.page.scss'],
})
export class AccStatementPage implements OnInit {
  selectedAccount:any={};
  accStatments:any= [];
  accList:any=[];
  constructor(
    private global: GlobalService,
    private rest: RestService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getLinkedAccountNum();
  }
  getTxnCurrency(accountCurrency:string) {
    return this.global.getTextCurrency(accountCurrency);
  }
  formatAmount(balance:string) {
    return this.global.formatAmount(balance);
  }
  maskAccount(acc:string) {
    return this.global.maskAccNumber(acc);
  }
  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.global.getDefaultAccNumber(this.accList).then(res => {
          this.selectedAccount = res;
          this.getAccountBalance(res.accountNo);
        });
      } else {
        this.alertService.showAlert('ALERT', 'FAILED_LINKED_ACC');
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  getAccountBalance(accNum: any) {
    this.fetchAccStatement(accNum);
		this.selectedAccount.accountBalance = 0;
    this.rest.getAccountBalance(accNum).then(res => {
      if (res.RESP_STATUS == 'SUCCESS') {
        this.selectedAccount.accountBalance = res.BALANCE;
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(err=>{
      this.rest.closeLoader();
    });
	}
  fetchAccStatement(acc:string) {
    this.rest.fetchMiniStatement(acc).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accStatments = [];
        this.accStatments = resp.data;
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch((err:any) => {
      this.rest.closeLoader();
    });
  }
  formatNumber(amt:string) {
    return this.global.formatAmount(amt);
  }
  goBack(){
    this.global.pop();
  }
  async selectAccountNumber() {
    this.global.selectFromAccount(this.accList).then(res =>{
      if(res) {
        this.selectedAccount= res;
        this.getAccountBalance(res.accountNo);
      }
    });

  }
}
