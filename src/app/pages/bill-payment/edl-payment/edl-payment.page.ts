import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-edl-payment',
  templateUrl: './edl-payment.page.html',
  styleUrls: ['./edl-payment.page.scss'],
})
export class EdlPaymentPage implements OnInit {
  edlEnquiryForm= new FormGroup({
    province: new FormControl('', [Validators.required]),
    billNo: new FormControl('', [Validators.required])
  })
  constructor(
    private rest: RestService,
    private alertService: AlertService,
    private global: GlobalService
  ) { }

  ngOnInit() {
  }
  showProvince() {

  }
  searchBillNumber() {
    this.alertService.showToast('Please enter account number')
  }
}
