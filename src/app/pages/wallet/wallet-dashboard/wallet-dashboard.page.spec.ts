import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletDashboardPage } from './wallet-dashboard.page';

describe('WalletDashboardPage', () => {
  let component: WalletDashboardPage;
  let fixture: ComponentFixture<WalletDashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
