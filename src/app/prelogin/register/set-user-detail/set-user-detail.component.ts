import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { SelectDatePage } from 'src/app/shared/popovers/select-date/select-date.page';

@Component({
  selector: 'app-set-user-detail',
  templateUrl: './set-user-detail.component.html',
  styleUrls: ['./set-user-detail.component.scss'],
})
export class SetUserDetailComponent  implements OnInit {
  @Output() submitUserDetail: EventEmitter<any> = new EventEmitter();
  detailForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    gender: new FormControl('F', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    maritalStatus: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    nationality: new FormControl('LAOS', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }
  async openDOB() {
    const modal = await this.popoverCtrl.create({
      component: SelectDatePage,
      cssClass: 'select-date'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    let datePipe = new DatePipe('en-US');
    const newDate = datePipe.transform(data, 'dd-MM-yyyy');
    this.detailForm.controls.dob.setValue(newDate);
  }
  async validateForm() {
    console.log(this.detailForm.value);
    console.log(this.detailForm.valid);
    if(this.detailForm.valid) {
      this.submitUserDetail.emit(this.detailForm.value);
    }
    
  }
}
