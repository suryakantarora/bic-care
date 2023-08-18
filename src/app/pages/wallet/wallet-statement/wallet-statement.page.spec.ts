import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletStatementPage } from './wallet-statement.page';

describe('WalletStatementPage', () => {
  let component: WalletStatementPage;
  let fixture: ComponentFixture<WalletStatementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletStatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
