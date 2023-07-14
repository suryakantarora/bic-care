import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLangPage } from './select-lang.page';

describe('SelectLangPage', () => {
  let component: SelectLangPage;
  let fixture: ComponentFixture<SelectLangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectLangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
