import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-bic-acc-transfer',
  templateUrl: './bic-acc-transfer.component.html',
  styleUrls: ['./bic-acc-transfer.component.scss'],
})
export class BicAccTransferComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() exchangeRate:any=1;
  @Output() sendDetail: EventEmitter<any>= new EventEmitter();
  // fromAccDetail:any={};
  // accList:any=[];
  ftForm:FormGroup = new FormGroup({
    fromAccount: new FormControl(''),
    fromCurrency: new FormControl(''),
    toAccount: new FormControl(''),
    toCurrency: new FormControl(''),
    txnAmount: new FormControl(''),
    remarks: new FormControl(''),
    benefType: new FormControl('N'),
    toAccountHolder: new FormControl(''),
  });
  constructor(
    private global: GlobalService,
    private alertService: AlertService,
    private rest: RestService
  ) { }

  ngOnInit() {}
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
  checkBenefType() {

  }
}
