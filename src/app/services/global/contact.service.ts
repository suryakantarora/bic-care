import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { ModalController } from '@ionic/angular';
import { SelectContactPage } from 'src/app/shared/modals/select-contact/select-contact.page';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private modalCtrl: ModalController
  ) { }

  async selectContact() {
    return await this.getContactList().then((res: any) => {
      const contactList = res?.contact?.phones;
      if (contactList.length > 1) {
        return this.openContactModal(res?.contact);
      } else {
        let str: string = this.removeSpecialCharacters(contactList[0]?.number);
        str = str.slice(-10);
        console.log(str);
        return str;
      }
    });
  }

  async openContactModal(contacts: any) {
    const modal = await this.modalCtrl.create({
      component: SelectContactPage,
      componentProps: contacts,
      initialBreakpoint: 0.4,
      breakpoints: [0.3, 0.5, 0.9],
      backdropBreakpoint: 0.1,
      backdropDismiss: false,
      cssClass: 'action-sheet-modal'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    let str: string = this.removeSpecialCharacters(data);
    str = str.slice(-10);
    console.log(str);
    return str;
  }
  async getContactList() {
    console.log('getContactList: start');
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true
    };
    /*
    // This will return all contacts
    const result = await Contacts.getContacts({ projection });
    console.log('getContactList: ' + JSON.stringify(result));
    return result;
    */

    // this will open native contact picker
    return await Contacts.pickContact({ projection });
  }
  removeSpecialCharacters(inputString: string) {
    // Use regular expression to remove non-alphanumeric characters
    return inputString.replace(/[^a-zA-Z0-9]/g, '');
  }
}
