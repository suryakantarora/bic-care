import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedbackForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required]),
    mobileNum: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
    feautures: new FormControl(''),
    otherFeedback: new FormControl(''),
  });
  rating='0';
  constructor() { }

  ngOnInit() {
  }
  countRating(value:string) {
    this.rating=value;
  }
}
