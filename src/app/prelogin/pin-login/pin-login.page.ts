import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin-login',
  templateUrl: './pin-login.page.html',
  styleUrls: ['./pin-login.page.scss'],
})
export class PinLoginPage implements OnInit {
  position=0;
  pin='';
  constructor() { }

  ngOnInit() {
  }
  async countPin(pin:string) {
    if(pin && this.position<6){
      this.position++;
      this.pin+=pin;
      console.log(this.pin);
    }
  }
  deletePin(){
    if(this.position) {
      this.position--;
      this.pin=this.pin.substring(0, this.pin.length-1);
      console.log(this.pin);
    }
  }
  deleteAll(){
    this.position=0;
    this.pin='';
  }
}
