import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.scss'],
})
export class AddFavoriteComponent implements OnInit {
  @Output() showBenefListTab: EventEmitter<any> = new EventEmitter();
  benefForm: FormGroup;
  pageStatus = 2;
  constructor(
    private rest: RestService,
    public global: GlobalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initFormGroup();
  }
  goBack() {
    this.displayBenefListTab();
    this.pageStatus = 1;
    console.log('PageStatus: ' + this.pageStatus);
  }
  initFormGroup() {
    this.benefForm = new FormGroup({
      benefType: new FormControl('S', [Validators.required]),
      benefAccType: new FormControl(''),
      benefAccNum: new FormControl('', [Validators.required, Validators.minLength(10)]),
      cnfAccNum: new FormControl('', [Validators.required, Validators.minLength(10)]),
      benefNickName: new FormControl(''),
      benefAccName: new FormControl(''),
      benefAccCurrency: new FormControl(''),
      benefAddress: new FormControl(''),
    });
  }
  get accNotMatched() {
    const accNum = this.benefForm.controls['benefAccNum'].value;
    const cnfAcc = this.benefForm.controls['cnfAccNum'].value;
    if (accNum && accNum === cnfAcc) {
      return false;
    }
    return true;
  }
  validateAccNum() {
    console.log('Validate acc num');
    const benefType = this.benefForm.controls['benefType'].value;
    if (this.pageStatus === 1) {
      if (benefType === 'O') {
        this.validateLmpsBenefAccNum();
      } else {
        this.validateBicAccNum(benefType);
      }
    } else {
      console.log('Proceed to add beneficiary');
      if (benefType === 'S') {
        this.generateOtp(benefType);
      } else {
        this.initOtherAddBenef(benefType);
      }
    }
  }

  // BIC Customers code goes here
  validateBicAccNum(benefType: string) {
    const bankId = benefType === 'S' ? 'BIC' : 'BCEL';
    const accNum = this.benefForm.controls['benefAccNum'].value;

    const postData: any = {
      bankId: bankId,
      beneficiaryType: benefType
    };

    if (benefType === 'S') {
      postData.accNo = accNum;
    } else {
      postData.accountNumber = accNum;
    }

    this.rest.accountInfo(postData).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.validateAccResp(resp, bankId, benefType);
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  // {"accountCCY":"418","accountType":"Saving","accountNo":"375745272752752","accountName":"Test Card 3"}
  validateAccResp(resp: any, bankId: string, benefType: string) {
    this.pageStatus = 2;
    this.benefForm.controls['benefAccType'].setValue(resp.accountType);
    this.benefForm.controls['benefAccName'].setValue(resp.accountName);
    this.benefForm.controls['benefBankId'].setValue(bankId);
    this.benefForm.controls['benefAccCurrency'].setValue(resp.accountCCY);
    /* if(benefType === 'B') {
    } else if (benefType === 'S') {
      this.benefForm.controls['benefAccCurrency'].setValue(resp.accountCurrency);
    } */
  }
  generateOtp(benefType: string) {
    // [FTR = Fund transfer, ABF = Add bnf, DBF = Delete BNF]
    this.rest.generateOtpForTransfer('ABF').then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.initBicAddBenef(benefType);
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  initBicAddBenef(benefType: string) {
    console.log('Proceed to add benef for BIC');
    const postData = {
      accountNo: this.benefForm.controls['benefAccNum'].value,
      fullName: this.benefForm.controls['benefAccName'].value,
      accountName: this.benefForm.controls['benefAccName'].value,
      nickName: this.benefForm.controls['benefNickName'].value,
      accountType: this.benefForm.controls['benefAccType'].value,
      beneficiaryType: benefType,
      bankId: 'BIC',
      accountCurrency: this.benefForm.controls['benefAccCurrency'].value,
      accountCCY: this.benefForm.controls['benefAccCurrency'].value,
    };
    this.rest.addhBeneficiary(postData).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.displayBenefListTab();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  // LMPS Beneficiary Code goes here
  validateLmpsBenefAccNum() {

  }

  initOtherAddBenef(benefType: string) {

  }
  displayBenefListTab() {
    this.showBenefListTab.emit(true);
  }
}
