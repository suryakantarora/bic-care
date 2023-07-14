import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatesPage } from './rates.page';

describe('RatesPage', () => {
  let component: RatesPage;
  let fixture: ComponentFixture<RatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
