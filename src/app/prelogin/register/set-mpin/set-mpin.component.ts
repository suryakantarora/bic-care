import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-mpin',
  templateUrl: './set-mpin.component.html',
  styleUrls: ['./set-mpin.component.scss'],
})
export class SetMpinComponent  implements OnInit {
  @Output() submitPinDetail: EventEmitter<any> = new EventEmitter();
  pinForm: FormGroup = new FormGroup({
    pin: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    cnfPin: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });
  
  constructor() { }

  ngOnInit() {}
  async validateForm() {
    if(this.pinForm.valid) {
      this.submitPinDetail.emit(this.pinForm.value);
    }
  }
}
