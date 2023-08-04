import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtBicUmoneyPage } from './ft-bic-umoney.page';

describe('FtBicUmoneyPage', () => {
  let component: FtBicUmoneyPage;
  let fixture: ComponentFixture<FtBicUmoneyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtBicUmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
