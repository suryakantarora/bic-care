import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { BankListPage } from 'src/app/shared/modals/bank-list/bank-list.page';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.scss'],
})
export class AddFavoriteComponent implements OnInit {
  @Output() displayBenefListTab: EventEmitter<any> = new EventEmitter();
  benefForm: FormGroup;
  fromAccDetail: any = {};
  pageStatus = 1;
  otherBankDetail: any = {};
  constructor(
    private rest: RestService,
    public global: GlobalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initFormGroup();
  }
  get f() { return this.benefForm.controls; }
  goBack() {
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
      benefBankId: new FormControl('BIC'),
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
  checkValidation() {
    const benefType = this.f['benefType'].value;
    console.log('benefType: ' + benefType);
    if (benefType === 'O') {
      this.benefForm.controls['benefBankId'].setValue('');
      this.benefForm.controls['benefBankId'].addValidators([Validators.required]);
      this.fetchFromAccDetails();
    } else if (benefType === 'B') {
      this.benefForm.controls['benefBankId'].setValue('BCEL');
      this.otherBankDetail = {};
    } else {
      this.benefForm.controls['benefBankId'].setValue('BIC');
      this.otherBankDetail = {};
    }
  }
  addBankIdValidator() {
    this.f['benefBankId'].setValue('');
    this.f['benefBankId'].addValidators([Validators.required]);
  }
  clearBankIdValidator() {
    this.f['benefBankId'].removeValidators(Validators.required);
    this.f['benefBankId'].clearValidators();
    this.f['benefBankId'].setErrors(null);
  }
  // this is required to get lmps bank account details
  fetchFromAccDetails() {
    if (this.fromAccDetail.accountNo) return;
    console.log('Fetching From Acc Details');
    this.rest.fetchLinkedAccount().then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.global.getDefaultAccNumber(resp.data).then(res => {
          console.log('Default Acc Num: ' + JSON.stringify(res));
          if (res) {
            this.fromAccDetail = res;
          }
        });
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(() => {
      this.rest.closeLoader();
    });
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
      this.generateOtp(benefType);
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
      bankId: this.benefForm.controls['benefBankId'].value,
      accountCurrency: this.benefForm.controls['benefAccCurrency'].value,
      accountCCY: this.benefForm.controls['benefAccCurrency'].value,
    };
    this.rest.addhBeneficiary(postData).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.displayBenefList();
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    });
  }
  // LMPS Beneficiary Code goes here

  async selectOtherBank() {
    const modal = await this.global.modalCtrl.create({
      component: BankListPage,
      handle: false,
      mode: 'ios',
      initialBreakpoint: 1.0,
      breakpoints: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.otherBankDetail = data;
    this.f['benefBankId'].setValue(data.memberId);
  }
  validateLmpsBenefAccNum() {
    const benefType = this.f['benefType'].value;
    const benefBankId = this.f['benefType'].value;
    if (!this.otherBankDetail.memberName) {
      // this.alertService.showAlert('ALERT', 'PLZ_SELECT_UR_BANK');
      this.alertService.showToast('PLZ_SELECT_UR_BANK');
      return;
    }
    if (!this.fromAccDetail.accountNo) {
      this.alertService.showToast('SELECT_FRM_ACC');
      return;
    }
    const postData = {
      memberId: this.otherBankDetail.memberId,
      accountNumber: this.benefForm.controls['benefAccNum'].value,
      fromCustAccount: this.fromAccDetail.accountNo
    };
    this.rest.lmpsEnquiry(postData).then(resp => {
      if (resp.RESP_CODE === 'MPAY1019') {
        this.global.timeout()
      } else if (resp.RESP_STATUS == 'SUCCESS') {
        this.benefForm.controls['benefAccType'].setValue(resp.accountType);
        this.benefForm.controls['benefAccName'].setValue(resp.accountName);
        if (benefType === 'B') {
          this.benefForm.controls['benefBankId'].setValue(this.otherBankDetail.memberId);
          this.benefForm.controls['benefAccCurrency'].setValue(resp.accountCCY);
        } else {
          this.benefForm.controls['benefAccCurrency'].setValue(resp.accountCurrency);
        }
      } else {
        this.alertService.showAlert('ALERT', resp.REASON || resp.RESP_CODE);
      }
    }).catch(err => {
      this.rest.closeLoader();
    })
  }

  fetchImage(id: string) {
    return this.global.getLogoPath(id);
  }
  displayBenefList() {
    console.log('tttt');
    this.displayBenefListTab.emit('true');
  }
}
