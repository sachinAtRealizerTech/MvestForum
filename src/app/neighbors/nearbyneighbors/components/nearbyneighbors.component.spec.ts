import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyneighborsComponent } from './nearbyneighbors.component';

describe('NearbyneighborsComponent', () => {
  let component: NearbyneighborsComponent;
  let fixture: ComponentFixture<NearbyneighborsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyneighborsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyneighborsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
