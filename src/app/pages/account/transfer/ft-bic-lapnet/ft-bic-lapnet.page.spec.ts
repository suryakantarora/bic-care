import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FtBicLapnetPage } from './ft-bic-lapnet.page';

describe('FtBicLapnetPage', () => {
  let component: FtBicLapnetPage;
  let fixture: ComponentFixture<FtBicLapnetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FtBicLapnetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
