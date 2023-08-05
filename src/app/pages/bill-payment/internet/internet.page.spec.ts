import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternetPage } from './internet.page';

describe('InternetPage', () => {
  let component: InternetPage;
  let fixture: ComponentFixture<InternetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InternetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
