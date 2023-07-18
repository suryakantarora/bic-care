import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage implements OnInit {
  url: any='https://biclaos.com/policy/T&C.html&embedded=true';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.url=this.sanitizer.bypassSecurityTrustResourceUrl('https://biclaos.com/policy/T&C.html&embedded=true');
  }
}
