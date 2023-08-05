import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletToWalletPage } from './wallet-to-wallet.page';

describe('WalletToWalletPage', () => {
  let component: WalletToWalletPage;
  let fixture: ComponentFixture<WalletToWalletPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletToWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
