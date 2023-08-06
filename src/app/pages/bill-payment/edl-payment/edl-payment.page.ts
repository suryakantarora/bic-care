import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edl-payment',
  templateUrl: './edl-payment.page.html',
  styleUrls: ['./edl-payment.page.scss'],
})
export class EdlPaymentPage implements OnInit {
  edlEnquiryForm= new FormGroup({
    txnAmount: new FormControl('')
  })
  constructor() { }

  ngOnInit() {
  }

}
