import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellReportsComponent } from './well-reports.component';

describe('WellReportsComponent', () => {
  let component: WellReportsComponent;
  let fixture: ComponentFixture<WellReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
