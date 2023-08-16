import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {
  exchangeRates:any=[]; // [{"sellRate":"21580","currency":"978","buyRate":"21366"},{"sellRate":"19205","currency":"840","buyRate":"19080"},{"sellRate":"578.75","currency":"764","buyRate":"573.02"}];
  rate='INTER';
  constructor(private rest: RestService, private global: GlobalService) { }

  ngOnInit() {
    this.fetchExchangeRate();
  }
  async fetchExchangeRate() {
    this.rest.fetchExchangeRate().then(res => {
      console.log(res);
      if(res.RESP_STATUS==='SUCCESS') {
        this.exchangeRates=res.data;
      }
      this.fetchInterestRate();
    }).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  async fetchInterestRate() {
    this.rest.fetchInterestRate().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
      this.rest.closeLoader();
    });
  }
  getCurrency(cur:any) {
    return this.global.getTextCurrency(cur)
  }
  formatAmount(amt:string) {
    return this.global.formatAmount(amt)
  }
}
