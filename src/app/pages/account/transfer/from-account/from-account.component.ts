import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-from-account',
  templateUrl: './from-account.component.html',
  styleUrls: ['./from-account.component.scss'],
})
export class FromAccountComponent implements OnInit {
  @Output() sendAccList: EventEmitter<any> = new EventEmitter();
  @Output() sendFromAccDetail: EventEmitter<any> = new EventEmitter();
  @Output() sendExchangeRate: EventEmitter<any> = new EventEmitter();
  @Output() sendUserDetails: EventEmitter<any> = new EventEmitter();
  accList: any = [{ "accountState": "P", "accountCCY": "418", "accountPriority": "1", "accountNo": "000010200667601", "accountType": "10" },
  { "accountState": "S", "accountCCY": "418", "accountPriority": "2", "accountNo": "000030200181803", "accountType": "10" }];
  transferType = 'BIC';
  fromAccDetail: any = {
    accountType: '10',
    accountCCY: '418',
    accountNo: '000010200667601'
  };
  selectedCurrency: any;
  exchangeRate: any=1;
  accountBalance: number = 1000;
  userDetail: any;
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService,
  ) { }

  ngOnInit() {
    /* this.sendAccList.emit(this.accList);
    this.sendFromAccDetail.emit(this.fromAccDetail);
    this.sendExchangeRate.emit(1); */
    this.getUserInfo();
  }
  get accType() {
    return this.global.getAccType(this.fromAccDetail.accountType);
  }
  maskAcc(acc: string) {
    return this.global.maskedAccountNumber(acc);
  }
  getCurrency(accountCCY: string) {
    return this.global.getTextCurrency(accountCCY);
  }
  maskBalance(accountBalance: any) {
    return this.global.formatAmount(accountBalance);
  }
  getUserInfo() {
    this.userDetail = this.rest.completeUserInfo;
    this.sendUserDetails.emit(this.rest.completeUserInfo);
    this.getLinkedAccountNum();
  }
  getLinkedAccountNum() {
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.accList = [];
        this.accList = resp.data;
        this.sendAccList.emit(this.accList);
        this.global.getDefaultAccNumber(this.accList).then(res => {
          this.fromAccDetail = res;
          this.selectedCurrency = res.accountCCY;
          this.getAccountBalance(res.accountNo);
        });
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  async selectFromAccount() {
    await this.global.selectFromAccount(this.accList).then(res => {
      if (!res) return;
      console.log(JSON.stringify(res));
      this.selectedCurrency = res.accountCCY;
      this.fromAccDetail = res;
      this.getAccountBalance(res.accountNo);
    });
  }
  getAccountBalance(accNum: any) {
    this.accountBalance = 0;
    this.sendFromAccDetail.emit(this.fromAccDetail);
    this.rest.getAccountBalance(accNum).then(res => {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (res.RESP_STATUS == 'SUCCESS') {
        this.accountBalance = res.BALANCE;
        this.exchangerate();
      }
      else {
        this.accountBalance = 0;
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    }).catch(err => {
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
            this.sendExchangeRate.emit(i.buyRate);
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
}
