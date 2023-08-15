import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectContactPage } from './select-contact.page';

describe('SelectContactPage', () => {
  let component: SelectContactPage;
  let fixture: ComponentFixture<SelectContactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
