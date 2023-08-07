import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccStatementPage } from './acc-statement.page';

describe('AccStatementPage', () => {
  let component: AccStatementPage;
  let fixture: ComponentFixture<AccStatementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccStatementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
