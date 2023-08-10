import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.scss'],
})
export class AddFavoriteComponent  implements OnInit {
  benefForm : FormGroup;
  constructor() { }

  ngOnInit() {
    this.initFormGroup();
  }
  initFormGroup() {
    this.benefForm = new FormGroup({
      benefType: new FormControl('S', [Validators.required]),
      benefAccNum: new FormControl('', [Validators.required, Validators.minLength(10)]),
      cnfAccNum: new FormControl('', [Validators.required, Validators.minLength(10)]),
      bemefNickName: new FormControl('S'),
      bemefAccName: new FormControl('S'),
      bemefAccType: new FormControl('S'),
      bemefAddress: new FormControl('S'),
    });
  }
  get accNotMatched() {
    const accNum= this.benefForm.controls['benefAccNum'].value;
    const cnfAcc= this.benefForm.controls['cnfAccNum'].value;
    if(accNum && accNum===cnfAcc) {
      return false;
    }
    return true;
  }
  validateAccNum() {
    
  }
}
