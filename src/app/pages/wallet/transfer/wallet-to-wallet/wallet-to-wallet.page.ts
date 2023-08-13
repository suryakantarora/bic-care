import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-to-wallet',
  templateUrl: './wallet-to-wallet.page.html',
  styleUrls: ['./wallet-to-wallet.page.scss'],
})
export class WalletToWalletPage implements OnInit {
  walletDetail:any={};
  constructor() { }

  ngOnInit() {
  }
  initUserDetails(event:any) {

  }
  initWalletDetails(event:any) {
    this.walletDetail=event;
  }
}
