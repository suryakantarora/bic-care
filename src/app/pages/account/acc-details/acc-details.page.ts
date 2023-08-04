import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SocialShareService } from 'src/app/services/social-share/social-share.service';

@Component({
  selector: 'app-acc-details',
  templateUrl: './acc-details.page.html',
  styleUrls: ['./acc-details.page.scss'],
})
export class AccDetailsPage implements OnInit {
  accDetail:any={
    userName: 'Suryakant Kumar', 
    email: 'surya@cgs.com',
    accountNo:'123456789456123',
    accountType: 10,
    branch: 'BIC Head Office',
    bankId: 'BIC',
    mobile: '2052102465',
    branchAddress: 'Bharathiyar Street, Abith Colony, Saidapet, Chennai, Tamilnadu - 600015'
  };
  showAccDetails=false;
  constructor(
    private global: GlobalService,
    private translate: TranslateService,
    private socialService: SocialShareService,
    private alertService: AlertService,
    private rest:RestService
  ) { }

  ngOnInit() {
    this.fetchAccDetail();
  }
  maskedNumber(number:any) {
		if (number !== undefined && number !== null && number !== '') {
			return this.global.maskedNumber(number);
		} else {
      return number;
    }
	}

  getAccType(accType: string){
    return this.global.getAccType(accType);
  }

  maskedMobile(mobileNum:any) {
    return this.global.maskedMobile(mobileNum);
  }

  sharevia() {
    const data = this.translate.instant("FIND_MY_ACCOUNT") + ':\n' + 'Acc Holder : ' + this.accDetail.userName +
    ',\nAcc Number : ' + this.accDetail.accountNo + ',\nBank ID : ' + this.accDetail.bankId
    + ',\nBranch : ' + this.accDetail.branch + ',\nAddress : ' + this.accDetail.branchAddress + ',\nMobile : ' + this.accDetail.mobile;
    this.socialService.shareText(this.translate.instant('ACCOUNT_DETAIL'), data);
  }

  fetchAccDetail() {
    this.rest.getAccountDetails({}).then(resp=> {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (resp.RESP_STATUS === 'SUCCESS') {
        this.showAccDetails=true;
        this.accDetail = resp;
      } else {
        this.global.pop();
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
}
