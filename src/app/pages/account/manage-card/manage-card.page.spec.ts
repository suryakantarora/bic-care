import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCardPage } from './manage-card.page';

describe('ManageCardPage', () => {
  let component: ManageCardPage;
  let fixture: ComponentFixture<ManageCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
