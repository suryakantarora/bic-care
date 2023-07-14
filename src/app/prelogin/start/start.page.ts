import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  imgList: any = [];
  constructor(
    private translate: TranslateService,
    private navCtrl: NavController
  ) { 
    
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.translate.instant('TUTORIAL_WELCOME_HEAD1'));
    }, 100);
    this.initData();
  }
  initData() {
    this.imgList=[
      { title: 'TUTORIAL_WELCOME_HEAD1', desc: 'TUTORIAL_WELCOME_MSG1', imgPath: 'assets/imgs/start/intro-img-1.png' },
      { title: 'TUTORIAL_WELCOME_HEAD2', desc: 'TUTORIAL_WELCOME_MSG2', imgPath: 'assets/imgs/start/intro-img-2.png' },
      { title: 'TUTORIAL_WELCOME_HEAD3', desc: 'TUTORIAL_WELCOME_MSG3', imgPath: 'assets/imgs/start/intro-img-3.png' },
      { title: 'READY_TO_USE', desc: '', imgPath: 'assets/imgs/start/intro-img-4.png' },
    ];
  }
  swiperSlideChanged(ev: any, swiper: any) {
    // console.log(this.swiper?.realIndex);
  }
  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }
  skip(){
    this.navCtrl.navigateRoot(['/register']);
  }
}
