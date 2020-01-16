import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydiscussionsComponent } from './mydiscussions.component';

describe('MydiscussionsComponent', () => {
  let component: MydiscussionsComponent;
  let fixture: ComponentFixture<MydiscussionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydiscussionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
