import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingcircleComponent } from './loadingcircle.component';

describe('LoadingcircleComponent', () => {
  let component: LoadingcircleComponent;
  let fixture: ComponentFixture<LoadingcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
