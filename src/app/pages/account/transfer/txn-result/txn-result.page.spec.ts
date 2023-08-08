import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TxnResultPage } from './txn-result.page';

describe('TxnResultPage', () => {
  let component: TxnResultPage;
  let fixture: ComponentFixture<TxnResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TxnResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
