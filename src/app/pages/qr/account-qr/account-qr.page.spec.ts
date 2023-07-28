import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountQrPage } from './account-qr.page';

describe('AccountQrPage', () => {
  let component: AccountQrPage;
  let fixture: ComponentFixture<AccountQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
