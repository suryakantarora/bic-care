import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-favourite',
  templateUrl: './manage-favourite.page.html',
  styleUrls: ['./manage-favourite.page.scss'],
})
export class ManageFavouritePage implements OnInit {
  selectedTab='OLD';
  constructor() { }

  ngOnInit() {
  }
  changeActiveTab(tab:string) {
    this.selectedTab=tab;
  }
}
