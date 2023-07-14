import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccDetailsPage } from './acc-details.page';

describe('AccDetailsPage', () => {
  let component: AccDetailsPage;
  let fixture: ComponentFixture<AccDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
