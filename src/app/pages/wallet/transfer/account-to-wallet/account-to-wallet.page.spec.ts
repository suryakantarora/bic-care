import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountToWalletPage } from './account-to-wallet.page';

describe('AccountToWalletPage', () => {
  let component: AccountToWalletPage;
  let fixture: ComponentFixture<AccountToWalletPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountToWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
