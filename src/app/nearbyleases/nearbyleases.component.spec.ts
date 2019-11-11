import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyleasesComponent } from './nearbyleases.component';

describe('NearbyleasesComponent', () => {
  let component: NearbyleasesComponent;
  let fixture: ComponentFixture<NearbyleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
