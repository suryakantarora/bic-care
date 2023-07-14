import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TxnFeePage } from './txn-fee.page';

describe('TxnFeePage', () => {
  let component: TxnFeePage;
  let fixture: ComponentFixture<TxnFeePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TxnFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
