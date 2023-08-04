import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtBicMmoneyPage } from './ft-bic-mmoney.page';

describe('FtBicMmoneyPage', () => {
  let component: FtBicMmoneyPage;
  let fixture: ComponentFixture<FtBicMmoneyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtBicMmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
