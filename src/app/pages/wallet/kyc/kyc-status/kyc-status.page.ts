import { Component, OnInit } from '@angular/core';
import { constants} from '../../../../services/constants';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-kyc-status',
  templateUrl: './kyc-status.page.html',
  styleUrls: ['./kyc-status.page.scss'],
})
export class KycStatusPage implements OnInit {
  contactNmbr1:string=constants.CONTACT_NUM1;
  contactNmbr2:string=constants.CONTACT_NUM2;
  contactPerson1:string=constants.CONTACT_PERSON1;
  contactPerson2:string=constants.CONTACT_PERSON2;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  contactBank(num:any) {
    this.closeModal(num);
  }
  closeModal(data:string) {
    this.modalCtrl.dismiss(data);
  }
}
