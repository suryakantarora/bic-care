import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchList=[
    {page: 'profile', name: 'Profile'},
    {page: 'my-account', name: 'My Account'},
    {page: 'fund-transfer', name: 'Fund Transfer'},
    {page: 'statements', name: 'Statements'},
    {page: 'card-info', name: 'Card Info'},
    {page: 'bill-pay', name: 'Bill Payments'},
    {page: 'scan-qr', name: 'Best Pay'},
    {page: 'wallet', name: 'Wallet'},
    {page: 'mobile-topup', name: 'Mobile Topup'},
    {page: 'offers', name: 'Offers'},
    {page: 'favorite', name: 'Favorite'},
    {page: 'quick-pay', name: 'Quick Pay'},
    {page: 'message', name: 'Message'},
    {page: 'settings', name: 'Settings'},
    {page: 'contact-us', name: 'Contact Us'},
    {page: 'change-pin', name: 'Change PIN'},
    {page: 'change-password', name: 'Change Password'},
  ];
  filterList=[...this.searchList];
  constructor() { }

  ngOnInit() {
  }
  filterListData(event:any) {
    const query = event.target.value.toLowerCase();
    this.filterList = this.searchList.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  }
}
