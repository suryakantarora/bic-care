import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletQrPage } from './wallet-qr.page';

describe('WalletQrPage', () => {
  let component: WalletQrPage;
  let fixture: ComponentFixture<WalletQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
