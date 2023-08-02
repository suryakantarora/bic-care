import { Component, OnInit } from '@angular/core';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.page.html',
  styleUrls: ['./link-card.page.scss'],
})
export class LinkCardPage implements OnInit {
  cardNumber: any;
  validity: string='MM/DD';
  cvv: string;
  cardHolderName: string='Card Holder Name';
  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(
    private alertService: AlertService,
    private rest: RestService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.initCardNumber();
  }
  initCardNumber() {
  }
  validateCard() {
    if(!this.cardNumber) {
      this.alertService.showToast('EMPTY_CARDNUM');
      return;
    }
    const cardNum = this.cardNumber.replaceAll(' ', '');
    console.log(cardNum);
    const postData = {
      cardNo:cardNum
    };
    this.rest.verifyCredentials(postData).then((res=> {
      if (res.RESP_CODE === 'MPAY1019') {
        this.global.timeout();
      } else if (res.RESP_STATUS == 'SUCCESS') {
        
      } else {
        this.alertService.showAlert('ALERT', res.REASON || res.RESP_CODE);
      }
    })).catch(() => {
      this.rest.closeLoader();
    })
  }
}
