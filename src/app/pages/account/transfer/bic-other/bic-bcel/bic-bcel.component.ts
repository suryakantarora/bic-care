import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bic-bcel',
  templateUrl: './bic-bcel.component.html',
  styleUrls: ['./bic-bcel.component.scss'],
})
export class BicBcelComponent  implements OnInit {
  @Input() fromAccDetail:any;
  @Input() accList:any;
  @Input() userDetail:any;
  @Input() exchangeRate:any;
  constructor() { }

  ngOnInit() {}

}
