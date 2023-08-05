import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletToAccountPage } from './wallet-to-account.page';

describe('WalletToAccountPage', () => {
  let component: WalletToAccountPage;
  let fixture: ComponentFixture<WalletToAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletToAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
