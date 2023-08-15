import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ContactService } from 'src/app/services/global/contact.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-bic-umoney',
  templateUrl: './bic-umoney.component.html',
  styleUrls: ['./bic-umoney.component.scss'],
})
export class BicUmoneyComponent implements OnInit {
  @Input() fromAccDetail: any;
  @Input() accList: any;
  @Input() userDetail: any;
  @Input() exchangeRate: any;

  ftForm = new FormGroup({
    toAccount: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)])
  });
  constructor(
    public global: GlobalService,
    private rest: RestService,
    private alertService:AlertService,
    private contactService: ContactService
  ) { }

  ngOnInit() { }
  selectContact() {
    this.contactService.selectContact([]).then(res=> {
      console.log('Contact List: ' + JSON.stringify(res));
      this.ftForm.controls['toAccount'].setValue(res);
    });
  }
}
