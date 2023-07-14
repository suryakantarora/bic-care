import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  contactNo='+85621 250 388';
  whatsappEngChn='+856 20 5657 6011';
  whatsappLao='+856 20 5878 7979';
  constructor() { }

  ngOnInit() {
  }

}
